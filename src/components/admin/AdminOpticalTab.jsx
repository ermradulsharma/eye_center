'use client';

import React from 'react';
import { Glasses, Plus, Trash2 } from 'lucide-react';

export default function AdminOpticalTab({
  filteredFrames = [],
  setIsAddFrameModalOpen,
  handleDeleteFrame,
}) {
  return (
    <div className="neu-card p-6 md:p-8 space-y-6">
      {/* Header Bar */}
      <div className="flex flex-wrap justify-between items-center gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Glasses className="w-5 h-5 text-sky-600" /> Optical Store Inventory Manager
          </h3>
          <p className="text-xs text-slate-500 font-semibold">Manage titanium air frames, acetate specs, and blue-cut power lenses on website store.</p>
        </div>

        <button
          onClick={() => setIsAddFrameModalOpen(true)}
          className="neu-btn-accent px-5 py-2.5 text-xs font-black flex items-center gap-2 shadow-xs"
        >
          <Plus className="w-4 h-4" /> Add Frame / Lens Item
        </button>
      </div>

      {/* Grid of Frame Items */}
      {filteredFrames.length === 0 ? (
        <div className="neu-flat p-12 text-center rounded-2xl text-slate-500 text-xs font-bold space-y-2">
          <Glasses className="w-8 h-8 text-slate-400 mx-auto" />
          <p>No optical frames currently listed in hospital catalog.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFrames.map((frame) => (
            <div key={frame._id} className="neu-card p-5 space-y-4 flex flex-col justify-between hover:scale-[1.01] transition-all">
              <div className="space-y-3">
                <div className="relative h-48 neu-flat rounded-xl overflow-hidden">
                  <img src={frame.imageUrl} alt={frame.name} className="w-full h-full object-cover" />
                  <span className="absolute top-3 right-3 neu-btn-accent px-3 py-1 text-[10px] font-black">
                    {frame.priceRange}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-black text-sky-700 uppercase tracking-widest block">{frame.brand}</span>
                  <h4 className="text-sm font-black text-slate-900 leading-tight mt-0.5">{frame.name}</h4>
                  <p className="text-xs text-slate-500 font-medium mt-1">{frame.material} • {frame.lensType}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-600 neu-flat px-2.5 py-1 rounded-full">
                  In Store Stock
                </span>
                <button
                  onClick={() => handleDeleteFrame(frame._id)}
                  className="neu-btn px-3 py-1.5 text-xs font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove Item
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
