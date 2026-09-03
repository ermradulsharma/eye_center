'use client';

import React from 'react';
import { ShieldCheck, Award, Glasses, Calendar, Clock, CheckCircle2 } from 'lucide-react';

export default function HeroSection({ onOpenBooking }) {
  return (
    <section className="py-12 md:py-16 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Content Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 neu-flat px-4 py-2 rounded-full text-xs font-extrabold text-sky-700 tracking-wide">
            <Award className="w-4 h-4 text-sky-600" /> Etah’s Premier Eye Hospital & Low Vision Rehab Center
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
            Complete Eye Care Solutions & Precision Optics <br className="hidden sm:inline" />
            <span className="text-sky-600 underline decoration-sky-300 decoration-wavy decoration-2">
              Under One Trusted Roof.
            </span>
          </h1>

          <p className="text-base md:text-lg text-slate-700 font-medium leading-relaxed max-w-2xl">
            डॉक्टर से आखों का एडवांस चेकअप कराने से लेकर पसंदीदा चश्मा (Power Lenses & Frames) लेने तक सब कुछ एक ही स्थान पर। कैटरैक्ट (मोतियाबिंद), लेसिक लेजर और विजन रीहैबिलिटेशन की सबसे भरोसेमंद मेडिकल केयर।
          </p>

          {/* Key Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-2.5 text-sm font-bold text-slate-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              Micro-Incision Blade-Free Cataract (MICS)
            </div>
            <div className="flex items-center gap-2.5 text-sm font-bold text-slate-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              Contoura Vision & LASIK Spectacle Removal
            </div>
            <div className="flex items-center gap-2.5 text-sm font-bold text-slate-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              In-House Prescription Optical & Power Lenses
            </div>
            <div className="flex items-center gap-2.5 text-sm font-bold text-slate-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              Low Vision & Blindness Rehabilitation Center
            </div>
          </div>

          {/* Hero Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={onOpenBooking}
              className="neu-btn-accent px-6 py-3.5 text-base font-extrabold flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" /> Book OPD Checkup Slot
            </button>
            <a
              href="#optical"
              className="neu-btn px-6 py-3.5 text-base font-extrabold text-slate-800 hover:text-sky-700 flex items-center gap-2"
            >
              <Glasses className="w-5 h-5 text-sky-600" /> Explore Optical Frames
            </a>
          </div>
        </div>

        {/* Right Neumorphic Hero Card Column */}
        <div className="lg:col-span-5">
          <div className="neu-card p-6 md:p-8 space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">Hospital OPD Hours</h3>
                <p className="text-xs font-semibold text-slate-500">Etah Main Center</p>
              </div>
              <Clock className="w-8 h-8 text-sky-600 p-1.5 neu-flat rounded-xl" />
            </div>

            <div className="space-y-3 text-sm font-semibold">
              <div className="flex justify-between items-center neu-flat p-3 rounded-xl">
                <span className="text-slate-700">Morning OPD Shift</span>
                <span className="font-extrabold text-sky-700">9:30 AM - 2:00 PM</span>
              </div>
              <div className="flex justify-between items-center neu-flat p-3 rounded-xl">
                <span className="text-slate-700">Evening OPD Shift</span>
                <span className="font-extrabold text-sky-700">4:30 PM - 7:00 PM</span>
              </div>
              <div className="flex justify-between items-center neu-flat p-3 rounded-xl bg-amber-500/10 text-slate-800">
                <span className="flex items-center gap-1.5 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Emergency Eye Care
                </span>
                <span className="font-black text-rose-600">24 / 7 Active</span>
              </div>
            </div>

            <div className="pt-2 text-center">
              <p className="text-xs text-slate-500 font-medium">
                * Zero wait time for pre-booked online OPD token holders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
