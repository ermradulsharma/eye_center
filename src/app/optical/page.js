'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AppointmentModal from '@/components/AppointmentModal';
import { Glasses, Search, Check, ShoppingBag, ArrowLeft, Filter, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function OpticalStorePage() {
  const [opticalFrames, setOpticalFrames] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch('/api/v1/user/treatments')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data && json.data.opticalFrames) {
          setOpticalFrames(json.data.opticalFrames);
        }
      })
      .catch(() => {});
  }, []);

  const filteredFrames = opticalFrames.filter((item) => {
    const matchesCat = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesQuery =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-[#ebf1f6] text-[#0f172a]">
      <Navbar onOpenBooking={() => setIsModalOpen(true)} />

      {/* Header Banner */}
      <section className="bg-[#0f172a] text-white py-12 px-4 border-b-4 border-sky-600">
        <div className="max-w-7xl mx-auto space-y-4">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Hospital Home
          </Link>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
            Hospital Prescription <span className="text-sky-400">Optical Store & Glasses</span>
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl font-medium">
            डॉक्टर द्वारा जांची गई सटीक पावर लेंस, डिजिटल एंटी-ग्लेयर ब्लू-कट शीशे और लाइटवेट टाइटेनियम फ्रेम्स—सब कुछ हॉस्पिटल परिसर में ही उपलब्ध।
          </p>
        </div>
      </section>

      {/* Search & Filter Toolbar */}
      <section className="py-8 px-4 max-w-7xl mx-auto space-y-6">
        <div className="neu-card p-4 md:p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Box */}
          <div className="w-full md:w-96 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search frames, blue cut lenses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="neu-input w-full pl-10 pr-4 py-2.5 text-xs font-semibold"
            />
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-2 text-xs font-extrabold w-full md:w-auto">
            {['ALL', 'FRAMES', 'POWER_LENSES', 'SUNGLASSES', 'KIDS_GLASSES'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl transition-all ${
                  selectedCategory === cat ? 'neu-btn-pressed text-sky-700 font-black' : 'neu-btn text-slate-700'
                }`}
              >
                {cat.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Frames Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredFrames.length === 0 ? (
            <div className="col-span-3 text-center py-12 neu-card">
              <Glasses className="w-12 h-12 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-600">No optical items matching your query.</p>
            </div>
          ) : (
            filteredFrames.map((item) => (
              <div key={item._id} className="neu-card p-6 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-full h-52 rounded-xl overflow-hidden neu-flat relative">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <span className="absolute top-3 right-3 bg-slate-900/90 text-white text-xs font-extrabold px-3 py-1 rounded-full backdrop-blur-md">
                      {item.priceRange}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-indigo-700 bg-indigo-100 px-2.5 py-0.5 rounded-md inline-block mb-1">
                      {item.brand}
                    </span>
                    <h3 className="text-lg font-black text-slate-900 leading-snug">{item.name}</h3>
                    <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">{item.description}</p>
                  </div>

                  <div className="neu-flat p-3 rounded-xl space-y-1 text-xs font-bold text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" /> Lens: {item.lensType}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" /> Material: {item.material}
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="neu-btn-accent w-full py-3 text-xs font-extrabold flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" /> Book Trial & OPD Consultation
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <AppointmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Footer />
    </div>
  );
}
