'use client';

import React, { useState, useEffect } from 'react';
import { Eye, Glasses, Calendar, Plus, Trash2, CheckCircle, Clock, ShieldCheck, ArrowLeft, RefreshCw, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('optical'); // 'optical' | 'appointments'
  const [frames, setFrames] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  // New Frame Form State
  const [newFrame, setNewFrame] = useState({
    name: '',
    brand: 'RS Signature Premium',
    category: 'FRAMES',
    lensType: 'Blue Cut Digital Anti-Glare',
    frameShape: 'Rectangle / Oval',
    material: 'TR90 Lightweight Acetate',
    priceRange: '₹1,499 - ₹2,999',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600',
    isTrending: true,
  });

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [resFrames, resAppts] = await Promise.all([
        fetch('/api/v1/admin/optical'),
        fetch('/api/v1/admin/appointments'),
      ]);

      const jsonFrames = await resFrames.json();
      const jsonAppts = await resAppts.json();

      if (jsonFrames.success) setFrames(jsonFrames.data || []);
      if (jsonAppts.success) setAppointments(jsonAppts.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFrame = async (e) => {
    e.preventDefault();
    if (!newFrame.name) return;

    try {
      const res = await fetch('/api/v1/admin/optical', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFrame),
      });
      const json = await res.json();
      if (json.success) {
        setMsg('New Frame successfully added to Hospital Store!');
        setNewFrame({
          name: '',
          brand: 'RS Signature Premium',
          category: 'FRAMES',
          lensType: 'Blue Cut Digital Anti-Glare',
          frameShape: 'Rectangle / Oval',
          material: 'TR90 Lightweight Acetate',
          priceRange: '₹1,499 - ₹2,999',
          description: '',
          imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600',
          isTrending: true,
        });
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteFrame = async (id) => {
    if (!confirm('Are you sure you want to remove this frame?')) return;
    try {
      const res = await fetch(`/api/v1/admin/optical?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setMsg('Frame removed.');
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateApptStatus = async (id, status) => {
    try {
      const res = await fetch('/api/v1/admin/appointments', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      const json = await res.json();
      if (json.success) {
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#ebf1f6] text-slate-900 pb-16">
      {/* Header */}
      <header className="bg-[#0f172a] text-white py-4 px-6 sticky top-0 z-40 border-b-4 border-sky-600 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 neu-flat rounded-xl flex items-center justify-center text-sky-400">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-white leading-tight">
                R.S. Eye Care Hospital <span className="text-sky-400 font-extrabold">Admin Dashboard</span>
              </h1>
              <p className="text-xs text-slate-400 font-semibold">Optical Store & OPD Appointments Management (Etah Center)</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={fetchAdminData} className="neu-btn px-3 py-1.5 text-xs font-bold text-slate-800 flex items-center gap-1">
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh Data
            </button>
            <Link href="/" className="neu-btn-accent px-4 py-1.5 text-xs font-extrabold flex items-center gap-1.5">
              <ArrowLeft className="w-4 h-4" /> Go to Website
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 pt-8 space-y-8">
        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="neu-card p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Optical Store Inventory</p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">{frames.length} Items Listed</h3>
              <p className="text-xs text-sky-600 font-bold mt-1">Power Glasses & Frames</p>
            </div>
            <Glasses className="w-10 h-10 text-indigo-600 neu-flat p-2 rounded-2xl" />
          </div>

          <div className="neu-card p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Total OPD Bookings</p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">{appointments.length} Patients</h3>
              <p className="text-xs text-emerald-600 font-bold mt-1">Direct Queue Tokens Issued</p>
            </div>
            <Calendar className="w-10 h-10 text-emerald-600 neu-flat p-2 rounded-2xl" />
          </div>

          <div className="neu-card p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Hospital Status</p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">OPD ACTIVE</h3>
              <p className="text-xs text-amber-600 font-bold mt-1">GT Road Etah Main Branch</p>
            </div>
            <Eye className="w-10 h-10 text-sky-600 neu-flat p-2 rounded-2xl" />
          </div>
        </div>

        {/* Action Message Notice */}
        {msg && (
          <div className="neu-card p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-900 font-bold text-sm flex justify-between items-center">
            <span>{msg}</span>
            <button onClick={() => setMsg(null)} className="text-xs font-extrabold text-emerald-700">Dismiss</button>
          </div>
        )}

        {/* Tab Selection */}
        <div className="flex border-b border-slate-300 gap-4">
          <button
            onClick={() => setActiveTab('optical')}
            className={`pb-3 text-sm font-extrabold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'optical' ? 'border-sky-600 text-sky-700' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Glasses className="w-4 h-4" /> Optical Store & Glasses Manager
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`pb-3 text-sm font-extrabold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'appointments' ? 'border-sky-600 text-sky-700' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4" /> Patient OPD Appointments Queue
          </button>
        </div>

        {/* TAB 1: OPTICAL STORE MANAGEMENT */}
        {activeTab === 'optical' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Column */}
            <div className="lg:col-span-5">
              <div className="neu-card p-6 space-y-4">
                <div className="border-b border-slate-200 pb-3">
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-sky-600" /> Add New Glass / Frame to Store
                  </h3>
                  <p className="text-xs font-semibold text-slate-500">Fill details to list in Website Optical Catalog.</p>
                </div>

                <form onSubmit={handleCreateFrame} className="space-y-3">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 mb-1">Frame / Product Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. RS Titanium Rimless UltraLite"
                      value={newFrame.name}
                      onChange={(e) => setNewFrame({ ...newFrame, name: e.target.value })}
                      className="neu-input w-full p-2.5 text-xs font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-800 mb-1">Category *</label>
                      <select
                        value={newFrame.category}
                        onChange={(e) => setNewFrame({ ...newFrame, category: e.target.value })}
                        className="neu-input w-full p-2.5 text-xs font-semibold"
                      >
                        <option value="FRAMES">Optical Frame</option>
                        <option value="POWER_LENSES">Power Lenses</option>
                        <option value="SUNGLASSES">Sunglasses</option>
                        <option value="KIDS_GLASSES">Kids Frames</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-slate-800 mb-1">Price Range *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. ₹1,499 - ₹2,999"
                        value={newFrame.priceRange}
                        onChange={(e) => setNewFrame({ ...newFrame, priceRange: e.target.value })}
                        className="neu-input w-full p-2.5 text-xs font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-800 mb-1">Lens Technology</label>
                      <input
                        type="text"
                        placeholder="e.g. Blue Cut Anti-Glare"
                        value={newFrame.lensType}
                        onChange={(e) => setNewFrame({ ...newFrame, lensType: e.target.value })}
                        className="neu-input w-full p-2.5 text-xs font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-slate-800 mb-1">Frame Material</label>
                      <input
                        type="text"
                        placeholder="e.g. Pure Titanium / Acetate"
                        value={newFrame.material}
                        onChange={(e) => setNewFrame({ ...newFrame, material: e.target.value })}
                        className="neu-input w-full p-2.5 text-xs font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 mb-1">Description</label>
                    <textarea
                      rows="2"
                      placeholder="e.g. Flexible acetate frame with anti-glare lens compatible."
                      value={newFrame.description}
                      onChange={(e) => setNewFrame({ ...newFrame, description: e.target.value })}
                      className="neu-input w-full p-2.5 text-xs font-semibold"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 mb-1">Image URL</label>
                    <input
                      type="url"
                      value={newFrame.imageUrl}
                      onChange={(e) => setNewFrame({ ...newFrame, imageUrl: e.target.value })}
                      className="neu-input w-full p-2.5 text-xs font-semibold"
                    />
                  </div>

                  <button type="submit" className="neu-btn-accent w-full py-3 text-xs font-extrabold flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" /> Save & List on Website Catalog
                  </button>
                </form>
              </div>
            </div>

            {/* Catalog List Column */}
            <div className="lg:col-span-7">
              <div className="neu-card p-6 space-y-4">
                <h3 className="text-lg font-black text-slate-900 border-b border-slate-200 pb-3">
                  Currently Listed Optical Items ({frames.length})
                </h3>

                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                  {frames.length === 0 ? (
                    <p className="text-xs text-slate-500 font-semibold p-4 text-center">No items listed yet.</p>
                  ) : (
                    frames.map((item) => (
                      <div key={item._id} className="neu-flat p-4 rounded-xl flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img src={item.imageUrl} alt={item.name} className="w-14 h-14 object-cover rounded-lg neu-flat shrink-0" />
                          <div>
                            <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded">
                              {item.category}
                            </span>
                            <h4 className="text-sm font-black text-slate-900 leading-snug">{item.name}</h4>
                            <p className="text-xs font-extrabold text-emerald-700 mt-0.5">{item.priceRange}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteFrame(item._id)}
                          className="p-2 neu-btn rounded-lg text-rose-600 hover:text-rose-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: OPD APPOINTMENTS QUEUE */}
        {activeTab === 'appointments' && (
          <div className="neu-card p-6 space-y-4">
            <h3 className="text-lg font-black text-slate-900 border-b border-slate-200 pb-3">
              Hospital Patient OPD Queue ({appointments.length} Tokens)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-semibold text-slate-700">
                <thead className="bg-slate-200/60 uppercase text-[11px] font-extrabold text-slate-900">
                  <tr>
                    <th className="p-3">Token #</th>
                    <th className="p-3">Patient Name</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Assigned Doctor</th>
                    <th className="p-3">Date & Slot</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {appointments.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="p-4 text-center text-slate-500 font-semibold">
                        No OPD bookings found yet.
                      </td>
                    </tr>
                  ) : (
                    appointments.map((appt) => (
                      <tr key={appt._id} className="hover:bg-slate-100/50">
                        <td className="p-3 font-extrabold text-sky-700">{appt.tokenNumber}</td>
                        <td className="p-3 font-black text-slate-900">{appt.patientName} ({appt.patientAge} Yrs)</td>
                        <td className="p-3">{appt.patientPhone}</td>
                        <td className="p-3 font-bold text-slate-800">{appt.doctorName}</td>
                        <td className="p-3">{appt.appointmentDate} <br /><span className="text-[10px] text-slate-500">{appt.timeSlot}</span></td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                            appt.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' :
                            appt.status === 'CANCELLED' ? 'bg-rose-100 text-rose-800' : 'bg-sky-100 text-sky-800'
                          }`}>
                            {appt.status}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-1">
                          <button
                            onClick={() => handleUpdateApptStatus(appt._id, 'COMPLETED')}
                            className="neu-btn px-2 py-1 text-[10px] font-bold text-emerald-700"
                          >
                            Mark Completed
                          </button>
                          <button
                            onClick={() => handleUpdateApptStatus(appt._id, 'CANCELLED')}
                            className="neu-btn px-2 py-1 text-[10px] font-bold text-rose-700"
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
