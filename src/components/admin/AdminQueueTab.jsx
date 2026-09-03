'use client';

import React from 'react';
import { Calendar, AlertCircle } from 'lucide-react';

export default function AdminQueueTab({
  filteredAppointments = [],
  statusFilter = 'ALL',
  setStatusFilter,
  handleUpdateApptStatus,
}) {
  return (
    <div className="neu-card p-6 md:p-8 space-y-6">
      {/* Table Header & Filter Bar */}
      <div className="flex flex-wrap justify-between items-center gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-600" /> OPD Patient Checkup Queue
          </h3>
          <p className="text-xs text-slate-500 font-semibold">Manage online appointment tokens, checkup confirmations, and status workflows.</p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {['ALL', 'BOOKED', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                statusFilter === st ? 'neu-btn-accent text-white' : 'neu-btn text-slate-700 hover:text-sky-700'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Data Table */}
      {filteredAppointments.length === 0 ? (
        <div className="neu-flat p-12 text-center rounded-2xl text-slate-500 text-xs font-bold space-y-2">
          <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
          <p>No patient OPD appointments found matching your criteria.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-semibold border-collapse">
            <thead>
              <tr className="neu-flat text-slate-700 uppercase tracking-wider text-[10px] font-black">
                <th className="p-4">Queue Token</th>
                <th className="p-4">Patient Information</th>
                <th className="p-4">Mobile Number</th>
                <th className="p-4">Checkup Slot</th>
                <th className="p-4">Assigned Doctor</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Update Workflow</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/70">
              {filteredAppointments.map((appt) => (
                <tr key={appt._id} className="hover:bg-slate-100/70 transition-colors">
                  <td className="p-4 font-mono font-black text-sky-700">{appt.tokenNumber}</td>
                  <td className="p-4">
                    <span className="font-extrabold text-slate-900 text-sm block">{appt.patientName}</span>
                    <span className="text-[11px] text-slate-500 font-semibold">{appt.patientAge} Yrs • {appt.gender}</span>
                  </td>
                  <td className="p-4 font-mono font-bold text-slate-800">{appt.patientPhone}</td>
                  <td className="p-4">
                    <span className="font-bold text-slate-800 block">{appt.appointmentDate}</span>
                    <span className="text-[11px] text-slate-500 font-medium">{appt.timeSlot}</span>
                  </td>
                  <td className="p-4 font-bold text-slate-800">{appt.doctorName || 'Dr. R.S. Verma'}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black ${
                      appt.status === 'BOOKED' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                      appt.status === 'CONFIRMED' ? 'bg-sky-100 text-sky-900 border border-sky-300' :
                      appt.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
                      'bg-rose-100 text-rose-900 border border-rose-300'
                    }`}>
                      {appt.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <select
                      value={appt.status}
                      onChange={(e) => handleUpdateApptStatus(appt._id, e.target.value)}
                      className="neu-input p-2 text-xs font-bold"
                    >
                      <option value="BOOKED">BOOKED</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
