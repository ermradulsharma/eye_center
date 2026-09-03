'use client';

import React from 'react';
import { Eye, MapPin, PhoneCall, Mail, Clock, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-slate-300 pt-16 pb-8 border-t-4 border-sky-600">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
        {/* Hospital Info */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white font-bold">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white leading-tight">
              R.S. Eye Care <br />
              <span className="text-sky-400 font-extrabold text-sm">& Rehabilitation Center</span>
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-medium leading-relaxed">
            एटा और पश्चिमी उत्तर प्रदेश का अग्रणी सुपर-स्पेशलिटी नेत्र चिकित्सालय और दृष्टि पुनर्वास केंद्र।
          </p>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-800/60">
            <ShieldCheck className="w-4 h-4 shrink-0" /> NABH Standards Hospital & Optical Facility
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="text-sm font-black uppercase text-white tracking-wider">Key Eye Services</h4>
          <ul className="space-y-2 text-xs font-semibold text-slate-400">
            <li><a href="#services" className="hover:text-sky-400 transition-colors">Micro-Incision Cataract (MICS)</a></li>
            <li><a href="#services" className="hover:text-sky-400 transition-colors">LASIK & Contoura Vision</a></li>
            <li><a href="#services" className="hover:text-sky-400 transition-colors">Glaucoma Screening & OCT</a></li>
            <li><a href="#optical" className="hover:text-sky-400 transition-colors">Power Glasses & Frames Shop</a></li>
            <li><a href="#rehab" className="hover:text-sky-400 transition-colors">Vision Rehabilitation Therapy</a></li>
          </ul>
        </div>

        {/* OPD Hours */}
        <div className="space-y-3">
          <h4 className="text-sm font-black uppercase text-white tracking-wider">Hospital Timings</h4>
          <div className="space-y-2 text-xs font-semibold text-slate-400">
            <p className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-400 shrink-0" /> Morning OPD: 9:30 AM - 2:00 PM
            </p>
            <p className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-400 shrink-0" /> Evening OPD: 4:30 PM - 7:00 PM
            </p>
            <p className="flex items-center gap-2 text-amber-300 font-bold">
              Sunday: 10:00 AM - 1:00 PM (Emergency Only)
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <h4 className="text-sm font-black uppercase text-white tracking-wider">Hospital Address</h4>
          <div className="space-y-2.5 text-xs font-semibold text-slate-400">
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              GT Road, Near Railway Crossing, Etah, Uttar Pradesh - 207001
            </p>
            <p className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
              <a href="tel:+919876543210" className="hover:text-white">+91 98765 43210</a>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-sky-400 shrink-0" />
              contact@rseyecareetah.com
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-semibold gap-4">
        <p>© 2026 R.S. Eye Care & Rehabilitation Center, Etah. All Rights Reserved.</p>
        <p className="text-slate-400">Tactile Neumorphism Design System | High Accessibility WCAG AAA</p>
      </div>
    </footer>
  );
}
