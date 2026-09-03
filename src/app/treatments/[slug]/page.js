import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Eye, Calendar, Award } from 'lucide-react';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const formattedTitle = slug ? slug.replace(/-/g, ' ').toUpperCase() : 'Eye Care Treatment';

  return {
    title: `${formattedTitle} in Etah | R.S. Eye Care & Rehabilitation Center`,
    description: `Expert ${formattedTitle} procedures, micro-incision cataract surgery, LASIK, and vision rehabilitation in Etah, Western UP.`,
  };
}

export default async function TreatmentDetailPage({ params }) {
  const { slug } = await params;
  const title = slug ? slug.replace(/-/g, ' ').toUpperCase() : 'Micro-Incision Cataract Surgery (MICS)';

  return (
    <div className="min-h-screen bg-[#ebf1f6] text-[#0f172a]">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-12 space-y-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sky-700 hover:text-sky-900 font-bold text-sm neu-btn px-4 py-2">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="neu-card p-8 md:p-12 space-y-6">
          <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-400/20 px-3.5 py-1.5 rounded-full text-xs font-black tracking-widest uppercase text-sky-700">
            <Award className="w-4 h-4 text-sky-600" /> Super-Specialty Ophthalmic Care
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
            {title} in Etah, UP
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
            R.S. Eye Care & Rehabilitation Center provides world-class ophthalmic surgical care utilizing state-of-the-art blade-free technology, advanced corneal topographic mapping, and imported foldable intraocular lenses (IOL).
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-4">
            <div className="neu-flat p-4 rounded-xl space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" /> Stitchless & Painless
              </h4>
              <p className="text-xs text-slate-600">Topical anesthesia drops with zero hospital stay required.</p>
            </div>
            <div className="neu-flat p-4 rounded-xl space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" /> Same Day Recovery
              </h4>
              <p className="text-xs text-slate-600">Quick 15-minute procedure with immediate crystal-clear vision.</p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200/60 flex flex-wrap items-center gap-4">
            <Link href="/#doctors" className="neu-btn-accent px-6 py-3 text-sm font-bold flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Book Consultation Checkup
            </Link>
            <a href="tel:+919876543210" className="neu-btn px-6 py-3 text-sm font-bold text-slate-800">
              Helpline: +91 98765 43210
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
