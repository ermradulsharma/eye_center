'use client';

import React, { useState } from 'react';
import { X, Calendar, User, Phone, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';

export default function AppointmentModal({ isOpen, onClose, doctors = [], selectedDoctorId = '' }) {
  const [formData, setFormData] = useState({
    patientName: '',
    patientAge: '',
    patientPhone: '',
    patientEmail: '',
    gender: 'MALE',
    doctorId: selectedDoctorId || (doctors[0] ? doctors[0]._id : ''),
    appointmentDate: new Date().toISOString().split('T')[0],
    timeSlot: '10:00 AM - 12:00 PM',
    reasonForVisit: 'General Eye Checkup & Vision Test',
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    if (selectedDoctorId) {
      setFormData((prev) => ({ ...prev, doctorId: selectedDoctorId }));
    } else if (doctors.length > 0 && !formData.doctorId) {
      setFormData((prev) => ({ ...prev, doctorId: doctors[0]._id }));
    }
  }, [selectedDoctorId, doctors]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/v1/user/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (json.success) {
        setResult(json.data);
      } else {
        setError(json.message || 'Failed to book OPD slot.');
      }
    } catch (err) {
      setError(err.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="neu-card w-full max-w-xl p-6 md:p-8 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 neu-btn rounded-xl text-slate-600 hover:text-slate-900"
        >
          <X className="w-5 h-5" />
        </button>

        {result ? (
          /* Confirmation State */
          <div className="text-center space-y-5 py-4">
            <div className="w-16 h-16 neu-flat rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xs font-black uppercase text-emerald-700 bg-emerald-100 px-3 py-1 rounded-md">
                OPD Slot Confirmed
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-2">Appointment Booked!</h3>
              <p className="text-sm font-semibold text-slate-600">
                Direct OPD Consultation at R.S. Eye Care & Rehab Center, Etah.
              </p>
            </div>

            <div className="neu-flat p-4 rounded-xl space-y-2 text-left text-sm font-semibold">
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-slate-600">Queue Token Number:</span>
                <span className="font-extrabold text-sky-700 text-lg">{result.tokenNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Patient Name:</span>
                <span className="font-bold text-slate-900">{result.patientName} ({result.patientAge} Yrs)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Assigned Doctor:</span>
                <span className="font-bold text-slate-900">{result.doctorName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Date & Slot:</span>
                <span className="font-bold text-sky-700">{result.appointmentDate} | {result.timeSlot}</span>
              </div>
            </div>

            <p className="text-xs font-bold text-amber-700 bg-amber-50 p-3 rounded-xl border border-amber-200">
              * कृपया अपने टोकन नंबर {result.tokenNumber} का स्क्रीनशॉट ले लें और OPD टाइम पर काउंटर पर दिखाएं।
            </p>

            <button
              onClick={() => {
                setResult(null);
                onClose();
              }}
              className="neu-btn-accent w-full py-3 text-sm font-bold"
            >
              Done & Close
            </button>
          </div>
        ) : (
          /* Form State */
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border-b border-slate-200/80 pb-3">
              <span className="text-xs font-bold uppercase text-sky-700 neu-flat px-3 py-1 rounded-md">
                Direct Hospital Registration
              </span>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-2">
                Book Doctor OPD Appointment
              </h3>
              <p className="text-xs font-semibold text-slate-500">
                Fill patient details to receive an instant OPD Queue Token.
              </p>
            </div>

            {error && (
              <div className="p-3 bg-rose-100 text-rose-800 text-xs font-bold rounded-xl flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" /> {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Patient Name */}
              <div>
                <label className="block text-xs font-extrabold text-slate-800 mb-1">
                  Patient Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  className="neu-input w-full p-2.5 text-sm font-semibold"
                />
              </div>

              {/* Age */}
              <div>
                <label className="block text-xs font-extrabold text-slate-800 mb-1">
                  Patient Age (Years) *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max="110"
                  placeholder="e.g. 45"
                  value={formData.patientAge}
                  onChange={(e) => setFormData({ ...formData, patientAge: e.target.value })}
                  className="neu-input w-full p-2.5 text-sm font-semibold"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-extrabold text-slate-800 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={formData.patientPhone}
                  onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
                  className="neu-input w-full p-2.5 text-sm font-semibold"
                />
              </div>

              {/* Doctor */}
              <div>
                <label className="block text-xs font-extrabold text-slate-800 mb-1">
                  Select Specialist Doctor *
                </label>
                <select
                  required
                  value={formData.doctorId}
                  onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                  className="neu-input w-full p-2.5 text-sm font-semibold"
                >
                  {doctors.map((doc) => (
                    <option key={doc._id} value={doc._id}>
                      {doc.name} - {doc.specialization.split(',')[0]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs font-extrabold text-slate-800 mb-1">
                  Appointment Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.appointmentDate}
                  onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                  className="neu-input w-full p-2.5 text-sm font-semibold"
                />
              </div>

              {/* Time Slot */}
              <div>
                <label className="block text-xs font-extrabold text-slate-800 mb-1">
                  Preferred Time Slot *
                </label>
                <select
                  value={formData.timeSlot}
                  onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                  className="neu-input w-full p-2.5 text-sm font-semibold"
                >
                  <option value="10:00 AM - 12:00 PM">Morning: 10:00 AM - 12:00 PM</option>
                  <option value="12:00 PM - 02:00 PM">Noon: 12:00 PM - 02:00 PM</option>
                  <option value="04:30 PM - 06:30 PM">Evening: 04:30 PM - 06:30 PM</option>
                </select>
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-xs font-extrabold text-slate-800 mb-1">
                Reason for Visit / Symptoms
              </label>
              <input
                type="text"
                placeholder="e.g. Cataract checkup, Eye strain, Power glass test"
                value={formData.reasonForVisit}
                onChange={(e) => setFormData({ ...formData, reasonForVisit: e.target.value })}
                className="neu-input w-full p-2.5 text-sm font-semibold"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="neu-btn-accent w-full py-3.5 text-sm font-extrabold flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Generating OPD Token...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> Confirm & Generate Token
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
