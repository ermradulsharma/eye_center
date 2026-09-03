'use client';

import React from 'react';
import { Eye, Glasses, Calendar, LayoutDashboard, ExternalLink, FileText, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  isSidebarOpen,
  setIsSidebarOpen,
  framesCount = 0,
  appointmentsCount = 0,
  pendingCount = 0,
}) {
  return (
    <aside
      className={`fixed md:sticky top-0 left-0 z-50 h-screen w-72 neu-dark-sidebar p-6 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      <div className="space-y-8">
        {/* Hospital Brand Logo Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-sky-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-sky-500/30 shrink-0">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-sm font-black text-white tracking-tight leading-none">R.S. EYE CARE</h2>
              <span className="text-[10px] font-extrabold text-sky-400 uppercase tracking-widest block mt-1">Admin Command Center</span>
            </div>
          </div>
          <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links Group */}
        <div className="space-y-2">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-3 mb-2">Main Navigation</p>

          <button
            onClick={() => { setActiveTab('overview'); setIsSidebarOpen(false); }}
            className={`w-full p-3.5 rounded-xl font-extrabold text-xs flex items-center justify-between transition-all duration-200 ${
              activeTab === 'overview'
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview & Analytics</span>
            </div>
            <ChevronRight className={`w-3.5 h-3.5 ${activeTab === 'overview' ? 'text-white' : 'text-slate-600'}`} />
          </button>

          <button
            onClick={() => { setActiveTab('appointments'); setIsSidebarOpen(false); }}
            className={`w-full p-3.5 rounded-xl font-extrabold text-xs flex items-center justify-between transition-all duration-200 ${
              activeTab === 'appointments'
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4" />
              <span>OPD Patient Queue</span>
            </div>
            {pendingCount > 0 ? (
              <span className="bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full text-[10px] font-black animate-pulse shadow-xs">
                {pendingCount}
              </span>
            ) : (
              <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded-md text-[10px] font-bold">{appointmentsCount}</span>
            )}
          </button>

          <button
            onClick={() => { setActiveTab('optical'); setIsSidebarOpen(false); }}
            className={`w-full p-3.5 rounded-xl font-extrabold text-xs flex items-center justify-between transition-all duration-200 ${
              activeTab === 'optical'
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <Glasses className="w-4 h-4" />
              <span>Optical Store Catalog</span>
            </div>
            <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded-md text-[10px] font-bold">{framesCount}</span>
          </button>

          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-3 pt-6 mb-2">Hospital Portals</p>

          <Link
            href="/"
            target="_blank"
            className="w-full p-3.5 rounded-xl font-extrabold text-xs flex items-center justify-between text-slate-400 hover:text-sky-400 hover:bg-slate-800/60 transition-all"
          >
            <div className="flex items-center gap-3">
              <ExternalLink className="w-4 h-4 text-sky-400" />
              <span>Public Patient Website</span>
            </div>
          </Link>

          <Link
            href="/api/v1/openapi"
            target="_blank"
            className="w-full p-3.5 rounded-xl font-extrabold text-xs flex items-center justify-between text-slate-400 hover:text-indigo-400 hover:bg-slate-800/60 transition-all"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>OpenAPI Specifications</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Sidebar Hospital Status Card */}
      <div className="neu-dark-card p-4 space-y-2 border border-slate-800">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">System Status</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        </div>
        <p className="text-xs font-black text-white">Etah Main Hospital Branch</p>
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold pt-2 border-t border-slate-800">
          <span>OPD Chamber 101</span>
          <span className="text-emerald-400 font-extrabold">ONLINE</span>
        </div>
      </div>
    </aside>
  );
}
