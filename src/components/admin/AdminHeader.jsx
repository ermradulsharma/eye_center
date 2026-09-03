'use client';

import React from 'react';
import { Menu, Search, Plus, RefreshCw } from 'lucide-react';

export default function AdminHeader({
  activeTab,
  searchQuery,
  setSearchQuery,
  setIsSidebarOpen,
  setIsAddFrameModalOpen,
  fetchAdminData,
  loading,
}) {
  return (
    <header className="neu-flat sticky top-0 z-30 px-6 md:px-8 py-4 flex items-center justify-between gap-4 border-b border-slate-300/80 bg-[#ebf1f6]/95 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden neu-btn p-2.5 rounded-xl text-slate-700"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold text-slate-400">Dashboard</span>
            <span className="text-xs text-slate-300">/</span>
            <span className="text-xs font-black text-sky-700 uppercase tracking-wider">{activeTab}</span>
          </div>
          <h1 className="text-base md:text-xl font-black text-slate-900 tracking-tight leading-tight">
            Hospital Command Center
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Global Search Input Bar */}
        <div className="relative hidden md:block w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search patient, token, phone, or frame..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="neu-input w-full pl-10 pr-4 py-2.5 text-xs font-bold"
          />
        </div>

        {/* Modal Trigger: Add Optical Frame */}
        <button
          onClick={() => setIsAddFrameModalOpen(true)}
          className="neu-btn-accent px-4 py-2.5 text-xs font-black flex items-center gap-2 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Optical Frame</span>
        </button>

        {/* Refresh SWR Data Button */}
        <button
          onClick={fetchAdminData}
          className="neu-btn p-2.5 text-slate-700 hover:text-sky-700"
          title="Refresh SWR Cache"
        >
          <RefreshCw className={`w-4 h-4 text-sky-600 ${loading ? 'animate-spin' : ''}`} />
        </button>

        {/* Admin User Profile */}
        <div className="neu-card px-3 py-1.5 flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-sky-600 to-sky-800 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-xs">
            AD
          </div>
          <div className="hidden xl:block text-left">
            <p className="text-xs font-black text-slate-900 leading-tight">Chief Admin</p>
            <p className="text-[10px] text-emerald-600 font-extrabold">Online</p>
          </div>
        </div>
      </div>
    </header>
  );
}
