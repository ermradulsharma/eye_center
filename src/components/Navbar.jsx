'use client';

import React from 'react';
import { Eye, PhoneCall, Calendar, ShieldCheck, MapPin, LayoutDashboard, Glasses } from 'lucide-react';
import Link from 'next/link';

export default function Navbar({ onOpenBooking }) {
  return (
    <header className="sticky top-0 z-40 bg-[#ebf1f6] border-b border-[#d1dce9] shadow-sm">
      {/* Top Emergency Bar */}
      <div className="bg-[#0f172a] text-white text-xs py-2 px-4 flex flex-wrap justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-sky-400" /> GT Road, Near Railway Crossing, Etah, UP
          </span>
          <span className="hidden md:flex items-center gap-1 text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> NABH Accredited Eye Care & Rehab Facility
          </span>
        </div>
        <div className="flex items-center gap-4 font-semibold">
          <Link href="/admin" className="flex items-center gap-1 text-sky-400 hover:text-sky-300 transition-colors font-bold">
            <LayoutDashboard className="w-3.5 h-3.5" /> Admin Dashboard
          </Link>
          <a href="tel:+919876543210" className="flex items-center gap-1 hover:text-sky-300 transition-colors">
            <PhoneCall className="w-3.5 h-3.5 text-rose-400" /> Helpline: +91 98765 43210
          </a>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-2xl neu-flat flex items-center justify-center text-sky-600 font-bold group-hover:scale-105 transition-transform">
            <Eye className="w-7 h-7 stroke-[2.2]" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold tracking-tight text-slate-900 leading-tight">
              R.S. Eye Care <span className="text-sky-600 font-extrabold">& Rehabilitation</span>
            </h1>
            <p className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
              Super-Specialty Hospital & Optical Center, Etah
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 font-semibold text-sm text-slate-700">
          <a href="/#services" className="hover:text-sky-600 transition-colors">Eye Treatments</a>
          <a href="/#doctors" className="hover:text-sky-600 transition-colors">Specialist Doctors</a>
          <Link href="/optical" className="hover:text-sky-600 transition-colors flex items-center gap-1 text-indigo-700 font-extrabold">
            <Glasses className="w-4 h-4" /> Optical Store
          </Link>
          <a href="/#rehab" className="hover:text-sky-600 transition-colors">Vision Rehabilitation</a>
        </nav>

        {/* CTA Button */}
        <div>
          <button
            onClick={onOpenBooking}
            className="neu-btn-accent px-5 py-2.5 flex items-center gap-2 text-sm font-bold tracking-wide"
          >
            <Calendar className="w-4 h-4" /> Book OPD Appointment
          </button>
        </div>
      </div>
    </header>
  );
}
