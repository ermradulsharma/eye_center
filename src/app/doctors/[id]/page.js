import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Calendar, Award, ShieldCheck, Clock, MapPin, UserX } from 'lucide-react';
import { DoctorService } from '@/core/Services/DoctorService.js';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const doctor = await DoctorService.getDoctorById(id);

  return {
    title: `${doctor ? doctor.name : 'Senior Ophthalmologist'} | R.S. Eye Care Etah`,
    description: `${doctor ? doctor.title : 'Chief Doctor'} specializing in ${doctor ? doctor.specialization : 'Eye Surgery'} in Etah, UP.`,
  };
}

export default async function DoctorProfilePage({ params }) {
  const { id } = await params;
  const doctor = await DoctorService.getDoctorById(id);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-[#ebf1f6] text-[#0f172a]">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-12 space-y-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sky-700 hover:text-sky-900 font-bold text-sm neu-btn px-4 py-2">
            <ArrowLeft className="w-4 h-4" /> Back to Hospital Home
          </Link>
          <div className="neu-card p-12 text-center text-slate-500 font-bold text-sm space-y-2">
            <UserX className="w-10 h-10 text-slate-400 mx-auto" />
            <p>Doctor profile not found in hospital database.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ebf1f6] text-[#0f172a]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sky-700 hover:text-sky-900 font-bold text-sm neu-btn px-4 py-2">
          <ArrowLeft className="w-4 h-4" /> Back to Hospital Home
        </Link>

        <div className="neu-card p-6 md:p-10 grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-1 neu-flat p-3 rounded-2xl overflow-hidden">
            <img src={doctor.imageUrl} alt={doctor.name} className="w-full h-64 object-cover rounded-xl" />
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-400/20 px-3.5 py-1 rounded-full text-xs font-black tracking-widest uppercase text-sky-700">
              <Award className="w-4 h-4 text-sky-600" /> Senior Consultant
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{doctor.name}</h1>
            <p className="text-sky-700 font-bold text-sm">{doctor.title}</p>
            <p className="text-slate-600 text-xs font-semibold">{doctor.qualifications}</p>

            <div className="neu-flat p-4 rounded-xl space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-800 font-bold">
                <ShieldCheck className="w-4 h-4 text-sky-600" /> Specialization: {doctor.specialization}
              </div>
              <div className="flex items-center gap-2 text-slate-600 font-medium">
                <Clock className="w-4 h-4 text-slate-500" /> OPD Hours: {doctor.opdSchedule}
              </div>
              <div className="flex items-center gap-2 text-slate-600 font-medium">
                <MapPin className="w-4 h-4 text-slate-500" /> Location: {doctor.opdRoomNo || 'OPD Chamber 101'}
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed">{doctor.bio}</p>

            <div className="pt-4 flex items-center gap-4">
              <Link href="/#doctors" className="neu-btn-accent px-6 py-3 text-sm font-bold flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Book Checkup Token
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
