'use client';

import React from 'react';
import { Eye, Sparkles, Glasses, Activity, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function BentoGridServices({ onOpenBooking }) {
  return (
    <section id="services" className="py-12 md:py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
        <h2 className="text-xs font-black uppercase tracking-widest text-sky-600 neu-flat inline-block px-4 py-1.5 rounded-full">
          Super-Specialty Eye Care & Rehab Services
        </h2>
        <h3 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight">
          Comprehensive Medical & Optical Bento Solutions
        </h3>
        <p className="text-sm md:text-base text-slate-600 font-medium">
          अत्याधुनिक लेजर सर्जरी, विशेषज्ञ डॉक्टर कंसल्टेशन, कस्टम चश्मे और दृष्टि पुनर्वास—सब कुछ एक जगह पर।
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Block 1: Micro-Incision Cataract (MICS) */}
        <div className="md:col-span-8 neu-card relative overflow-hidden group">
          <div className="relative z-10 p-6 md:p-8 flex flex-col justify-between h-full space-y-6">
            <div className="space-y-4">
              <div className="w-14 h-14 neu-flat rounded-2xl flex items-center justify-center text-sky-600">
                <Eye className="w-8 h-8" />
              </div>
              <span className="text-xs font-extrabold text-sky-700 uppercase tracking-wider bg-sky-100 px-3 py-1 rounded-md inline-block">
                Most Advanced Cataract Care
              </span>
              <h3 className="text-xl md:text-2xl font-black text-slate-900">
                Micro-Incision Blade-Free Cataract Surgery (MICS)
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                Stitchless, pain-free cataract removal with imported premium Foldable Intraocular Lenses (IOLs). Experience same-day discharge and crystal-clear vision restoration.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-slate-800 pt-2">
                <li className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-600" /> No Injection & No Stitch</li>
                <li className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-600" /> 15-Minute Same Day Surgery</li>
                <li className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-600" /> Multifocal & Toric IOLs</li>
                <li className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-600" /> Fast 24-Hour Recovery</li>
              </ul>
            </div>
            <div className="pt-2">
              <button onClick={onOpenBooking} className="neu-btn px-5 py-2.5 text-xs font-extrabold flex items-center gap-2 text-sky-700">
                Book Cataract OPD Consultation <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Block 2: Optical Frames & Lenses Shop */}
        <div id="optical" className="md:col-span-4 neu-card relative overflow-hidden border-2 border-sky-100 group">
          <div className="relative z-10 p-6 md:p-8 flex flex-col justify-between h-full space-y-6">
            <div className="space-y-4">
              <div className="w-14 h-14 neu-flat rounded-2xl flex items-center justify-center text-indigo-600">
                <Glasses className="w-8 h-8" />
              </div>
              <span className="text-xs font-extrabold text-indigo-700 uppercase tracking-wider bg-indigo-100 px-3 py-1 rounded-md inline-block">
                In-House Optical Store
              </span>
              <h3 className="text-xl font-black text-slate-900">
                Prescription Glasses & Custom Frames
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                डॉक्टर द्वारा तय सटीक पावर लेंस, डिजिटल एंटी-ग्लेयर ब्लू कट शीशे और लाइटवेट टाइटेनियम फ्रेम्स—हॉस्पिटल में ही उपलब्ध।
              </p>
            </div>
            <div className="pt-2">
              <Link href="/optical" className="neu-btn px-5 py-2.5 text-xs font-extrabold flex items-center gap-2 text-indigo-700 inline-flex">
                View Optical Catalog <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Block 3: LASIK & Contoura Vision */}
        <div className="md:col-span-4 neu-card relative overflow-hidden group">
          <div className="relative z-10 p-6 md:p-8 flex flex-col justify-between h-full space-y-6">
            <div className="space-y-4">
              <div className="w-14 h-14 neu-flat rounded-2xl flex items-center justify-center text-amber-600">
                <Sparkles className="w-8 h-8" />
              </div>
              <span className="text-xs font-extrabold text-amber-700 uppercase tracking-wider bg-amber-100 px-3 py-1 rounded-md inline-block">
                Spectacle Removal
              </span>
              <h3 className="text-xl font-black text-slate-900">
                LASIK & Contoura Laser Surgery
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                Permanent freedom from heavy specs and contact lenses with FDA-approved precision laser technology.
              </p>
            </div>
            <div className="pt-2">
              <button onClick={onOpenBooking} className="neu-btn px-5 py-2.5 text-xs font-extrabold flex items-center gap-2 text-amber-700">
                LASIK Eligibility Check <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Block 4: Vision Rehabilitation Center */}
        <div id="rehab" className="md:col-span-8 neu-card relative overflow-hidden group">
          <div className="relative z-10 p-6 md:p-8 flex flex-col justify-between h-full space-y-6">
            <div className="space-y-4">
              <div className="w-14 h-14 neu-flat rounded-2xl flex items-center justify-center text-emerald-600">
                <Activity className="w-8 h-8" />
              </div>
              <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider bg-emerald-100 px-3 py-1 rounded-md inline-block">
                Vision Rehab Unit
              </span>
              <h3 className="text-xl md:text-2xl font-black text-slate-900">
                Low Vision & Blindness Rehabilitation Therapy
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                कमज़ोर दृष्टि (Low Vision), रेटिना की समस्या या उम्र से जुड़ी नज़र की कमजोरी से जूझ रहे मरीजों के लिए विशेष थेरेपी, ऑप्टिकल मैग्नीफायर और मोबिलिटी ट्रेनिंग।
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-800">
                <span className="neu-flat px-3 py-1 rounded-lg">Optical Magnifiers</span>
                <span className="neu-flat px-3 py-1 rounded-lg">Contrast Enhancement Therapy</span>
                <span className="neu-flat px-3 py-1 rounded-lg">Orientation & Mobility Skills</span>
              </div>
            </div>
            <div className="pt-2">
              <button onClick={onOpenBooking} className="neu-btn px-5 py-2.5 text-xs font-extrabold flex items-center gap-2 text-emerald-700">
                Book Rehab Consultation <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
