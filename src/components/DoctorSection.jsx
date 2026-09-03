'use client';

import React from 'react';
import { Award, Clock, MapPin, Calendar, CheckCircle2, UserX } from 'lucide-react';

export default function DoctorSection({ doctors = [], onOpenBooking }) {
  return (
    <section id="doctors" className="py-12 md:py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
        <h2 className="text-xs font-black uppercase tracking-widest text-sky-600 neu-flat inline-block px-4 py-1.5 rounded-full">
          Our Senior Ophthalmologists
        </h2>
        <h3 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight">
          Experienced Doctors & Surgeons in Etah
        </h3>
        <p className="text-sm md:text-base text-slate-600 font-medium">
          20 से अधिक वर्षों के अनुभवी नेत्र रोग विशेषज्ञ और सर्जन आपकी आँखों की सम्पूर्ण देखभाल के लिए समर्पित हैं।
        </p>
      </div>

      {doctors.length === 0 ? (
        <div className="neu-card p-12 text-center text-slate-500 font-bold text-sm space-y-2">
          <UserX className="w-10 h-10 text-slate-400 mx-auto" />
          <p>No specialist doctors currently listed in database.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {doctors.map((doc) => (
            <div key={doc._id} className="neu-card p-6 md:p-8 flex flex-col sm:flex-row gap-6 items-center sm:items-start group">
              <div className="w-32 h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden neu-flat shrink-0 border-2 border-white/80 relative">
                <img src={doc.imageUrl} alt={doc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute bottom-2 right-2 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                  <CheckCircle2 className="w-3 h-3" /> Available
                </span>
              </div>

              <div className="space-y-3 flex-1 text-center sm:text-left">
                <div>
                  <span className="text-[11px] font-extrabold text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded-md inline-block mb-1">
                    {doc.title}
                  </span>
                  <h4 className="text-xl font-black text-slate-900 leading-snug">{doc.name}</h4>
                  <p className="text-xs font-bold text-slate-600 mt-0.5">{doc.qualifications}</p>
                </div>

                <div className="neu-flat p-3 rounded-xl space-y-1.5 text-xs font-bold text-slate-700">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Award className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>{doc.specialization} ({doc.experienceYears}+ Yrs Exp)</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{doc.opdSchedule}</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{doc.opdRoomNo || 'OPD Room 101'}</span>
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    onClick={() => onOpenBooking(doc._id)}
                    className="neu-btn-accent px-5 py-2.5 text-xs font-extrabold w-full sm:w-auto flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-4 h-4" /> Book Consultation with {doc.name.split(' ')[1]}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
