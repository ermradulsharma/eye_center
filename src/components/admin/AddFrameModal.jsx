'use client';

import React from 'react';
import { Plus, X } from 'lucide-react';

export default function AddFrameModal({
  isOpen,
  onClose,
  newFrame,
  setNewFrame,
  handleCreateFrame,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
      <div className="neu-card p-6 md:p-8 max-w-lg w-full space-y-6 bg-[#ebf1f6] shadow-2xl relative">
        <div className="flex justify-between items-center border-b border-slate-200/80 pb-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Plus className="w-5 h-5 text-sky-600" /> Add Frame / Lens to Store Catalog
            </h3>
            <p className="text-xs font-semibold text-slate-500">Item will display on Public Optical Store catalog immediately.</p>
          </div>
          <button
            onClick={onClose}
            className="neu-btn p-2 text-slate-600 hover:text-slate-900 rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleCreateFrame} className="space-y-4">
          <div>
            <label className="block text-xs font-extrabold text-slate-800 mb-1">Product / Frame Model Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. RS Titanium Rimless UltraLite Air"
              value={newFrame.name}
              onChange={(e) => setNewFrame({ ...newFrame, name: e.target.value })}
              className="neu-input w-full p-3 text-xs font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-800 mb-1">Category</label>
              <select
                value={newFrame.category}
                onChange={(e) => setNewFrame({ ...newFrame, category: e.target.value })}
                className="neu-input w-full p-3 text-xs font-semibold"
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
                className="neu-input w-full p-3 text-xs font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-800 mb-1">Lens Technology</label>
              <input
                type="text"
                placeholder="e.g. Blue Cut Anti-Glare"
                value={newFrame.lensType}
                onChange={(e) => setNewFrame({ ...newFrame, lensType: e.target.value })}
                className="neu-input w-full p-3 text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-800 mb-1">Frame Material</label>
              <input
                type="text"
                placeholder="e.g. Pure Titanium"
                value={newFrame.material}
                onChange={(e) => setNewFrame({ ...newFrame, material: e.target.value })}
                className="neu-input w-full p-3 text-xs font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold text-slate-800 mb-1">Product Image URL</label>
            <input
              type="url"
              placeholder="https://example.com/frame-image.jpg"
              value={newFrame.imageUrl}
              onChange={(e) => setNewFrame({ ...newFrame, imageUrl: e.target.value })}
              className="neu-input w-full p-3 text-xs font-semibold"
            />
          </div>

          <div className="pt-3 flex justify-end gap-3 border-t border-slate-200/80">
            <button
              type="button"
              onClick={onClose}
              className="neu-btn px-5 py-3 text-xs font-bold text-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="neu-btn-accent px-6 py-3 text-xs font-extrabold flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Save & List Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
