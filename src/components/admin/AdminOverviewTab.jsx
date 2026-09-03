'use client';

import React from 'react';
import { Calendar, Clock, Glasses, Stethoscope, TrendingUp, ChevronRight } from 'lucide-react';

export default function AdminOverviewTab({
  appointments = [],
  frames = [],
  pendingCount = 0,
  completedCount = 0,
  setActiveTab,
}) {
  return (
    <div className="space-y-8">
      {/* Executive Analytics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="neu-card p-6 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">Total OPD Registrations</span>
            <div className="w-10 h-10 neu-flat rounded-xl flex items-center justify-center text-emerald-600">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <h3 className="text-3xl font-black text-slate-900">{appointments.length}</h3>
            <span className="text-xs font-black text-emerald-600 flex items-center gap-0.5 neu-flat px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3.5 h-3.5" /> Direct OPD
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500">Direct Patient Queue Tokens Issued</p>
        </div>

        <div className="neu-card p-6 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">Waiting OPD Queue</span>
            <div className="w-10 h-10 neu-flat rounded-xl flex items-center justify-center text-amber-600">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <h3 className="text-3xl font-black text-amber-600">{pendingCount}</h3>
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
              Pending Confirm
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500">Live Hospital OPD Tokens</p>
        </div>

        <div className="neu-card p-6 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">Optical Catalog Items</span>
            <div className="w-10 h-10 neu-flat rounded-xl flex items-center justify-center text-sky-600">
              <Glasses className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <h3 className="text-3xl font-black text-slate-900">{frames.length}</h3>
            <span className="text-xs font-bold text-sky-700 neu-flat px-2 py-0.5 rounded-full">In Stock</span>
          </div>
          <p className="text-xs font-semibold text-slate-500">Listed Store Inventory Items</p>
        </div>

        <div className="neu-card p-6 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">Completed Checkups</span>
            <div className="w-10 h-10 neu-flat rounded-xl flex items-center justify-center text-indigo-600">
              <Stethoscope className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <h3 className="text-3xl font-black text-emerald-600">{completedCount}</h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
              Completed
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500">Finished Doctor Consultations</p>
        </div>
      </div>

      {/* Recent Patient Queue Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent OPD Tokens List */}
        <div className="lg:col-span-12 neu-card p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-200/80 pb-3">
            <div>
              <h3 className="text-base font-black text-slate-900">Recent OPD Patient Queue</h3>
              <p className="text-xs text-slate-500 font-semibold">Latest patient registrations from Etah hospital website.</p>
            </div>
            <button
              onClick={() => setActiveTab('appointments')}
              className="text-xs font-black text-sky-700 hover:underline flex items-center gap-1"
            >
              View Full Queue ({appointments.length}) <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {appointments.length === 0 ? (
            <div className="neu-flat p-10 text-center rounded-2xl text-xs font-bold text-slate-500">
              No OPD patient checkups registered yet.
            </div>
          ) : (
            <div className="space-y-3">
              {appointments.slice(0, 5).map((appt) => (
                <div key={appt._id} className="neu-flat p-4 rounded-xl flex flex-wrap items-center justify-between gap-3 hover:border-sky-300 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 neu-btn-accent rounded-xl flex items-center justify-center text-white font-mono text-xs font-black shrink-0">
                      {appt.tokenNumber ? appt.tokenNumber.slice(-2) : '01'}
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900">{appt.patientName} <span className="text-[11px] font-normal text-slate-500">({appt.patientAge} yrs, {appt.gender})</span></h4>
                      <p className="text-[11px] text-slate-500 font-semibold">{appt.patientPhone} • {appt.appointmentDate} ({appt.timeSlot})</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black ${
                      appt.status === 'BOOKED' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                      appt.status === 'CONFIRMED' ? 'bg-sky-100 text-sky-900 border border-sky-300' :
                      appt.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
                      'bg-rose-100 text-rose-900 border border-rose-300'
                    }`}>
                      {appt.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
