'use client';

import React, { useState, useEffect } from 'react';
import { Eye, ShieldCheck, Glasses, Calendar, Clock, Award, PhoneCall } from 'lucide-react';
import Link from 'next/link';

const BANNERS = [
    {
        id: 1,
        tag: 'SUPER-SPECIALTY EYE CARE & SURGERY',
        title: 'Advanced Blade-Free Cataract (MICS) & LASIK Laser Center',
        subtitle: 'एटा का प्रमुख नेत्र चिकित्सालय—स्टिचलेस मोतियाबिंद ऑपरेशन, कंटूरा विजन लेजर और ग्लोकोमा का अत्याधुनिक इलाज।',
        ctaText: 'Book OPD Checkup Slot',
        ctaLink: 'booking',
        badge: '15-Min Same Day Surgery',
        image: '/images/eye_center_banner.jpg',
    },
    {
        id: 2,
        tag: 'IN-HOUSE PRESCRIPTION OPTICAL STORE',
        title: 'Doctor Recommended Power Lenses & Branded Frames',
        subtitle: 'डॉक्टर द्वारा जांची गई सटीक पावर के अनुसार डिजिटल ब्लू-कट एंटी-ग्लेयर शीशे और अल्ट्रा-लाइटवेट टाइटेनियम फ्रेम्स।',
        ctaText: 'Explore Optical Frames Store',
        ctaLink: '/optical',
        badge: 'Precision Lens Guarantee',
        image: '/images/eye_center_banner.jpg',
    },
    {
        id: 3,
        tag: 'LOW VISION & REHABILITATION UNIT',
        title: 'Specialized Low Vision & Blindness Therapy Center',
        subtitle: 'कमजोर नज़र वाले मरीजों के लिए स्पेशल ऑप्टिकल मैग्नीफायर, कंट्रास्ट थेरेपी और इंडिपेंडेंट लिविंग ट्रेनिंग।',
        ctaText: 'Book Vision Rehab Session',
        ctaLink: 'booking',
        badge: 'Empowering Independent Vision',
        image: '/images/eye_center_banner.jpg',
    },
];

export default function HeroBanner({ onOpenBooking }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const currentBanner = BANNERS[currentIndex];

    return (
        <section className="HeroBanner">
            {/* Main Banner Frame */}
            <div className="neu-card overflow-hidden relative border-0 rounded-none shadow-none">
                {/* Background Image Container */}
                <div className="relative min-h-[400px] sm:min-h-[500px] md:min-h-[550px] flex items-center bg-[#0f172a]">
                    <img src={currentBanner.image} alt={currentBanner.title} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 brightness-75" />
                    
                    {/* Content Box */}
                    <div className="relative z-10 max-w-3xl p-5 sm:p-8 md:p-10 space-y-4 text-white">
                        <div className="inline-flex items-center gap-2 bg-sky-500/20 border border-sky-400/30 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-black tracking-widest uppercase text-sky-300">
                            <Award className="w-4 h-4 text-sky-400" /> {currentBanner.tag}
                        </div>
                        <h1 className="text-xl sm:text-3xl md:text-4xl font-black leading-tight tracking-tight text-white drop-shadow-md">{currentBanner.title}</h1>
                        <p className="text-xs sm:text-sm md:text-base text-slate-200 font-medium leading-relaxed max-w-2xl">{currentBanner.subtitle}</p>
                        
                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            {currentBanner.ctaLink === 'booking' ? (
                                <button onClick={onOpenBooking} className="neu-btn-accent px-5 py-3 text-xs md:text-sm font-black flex items-center gap-2">
                                    <Calendar className="w-4 h-4" /> {currentBanner.ctaText}
                                </button>
                            ) : (
                                <Link href={currentBanner.ctaLink} className="neu-btn-accent px-5 py-3 text-xs md:text-sm font-black flex items-center gap-2">
                                    <Glasses className="w-4 h-4" /> {currentBanner.ctaText}
                                </Link>
                            )}
                            <a href="tel:+919876543210" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all">
                                <PhoneCall className="w-4 h-4 text-emerald-400" /> Emergency: +91 98765 43210
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Hospital Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="neu-card p-4 flex items-center gap-3">
                    <div className="w-10 h-10 neu-flat rounded-xl flex items-center justify-center text-sky-600 font-bold shrink-0"><Eye className="w-5 h-5" /></div>
                    <div>
                        <h4 className="text-xs font-black text-slate-900 uppercase">Super-Specialty</h4>
                        <p className="text-[11px] text-slate-600 font-semibold">MICS Cataract & LASIK</p>
                    </div>
                </div>

                <div className="neu-card p-4 flex items-center gap-3">
                    <div className="w-10 h-10 neu-flat rounded-xl flex items-center justify-center text-indigo-600 font-bold shrink-0"><Glasses className="w-5 h-5" /></div>
                    <div>
                        <h4 className="text-xs font-black text-slate-900 uppercase">In-House Optics</h4>
                        <p className="text-[11px] text-slate-600 font-semibold">Power Glasses & Frames</p>
                    </div>
                </div>

                <div className="neu-card p-4 flex items-center gap-3">
                    <div className="w-10 h-10 neu-flat rounded-xl flex items-center justify-center text-emerald-600 font-bold shrink-0"><ShieldCheck className="w-5 h-5" /></div>
                    <div>
                        <h4 className="text-xs font-black text-slate-900 uppercase">Low Vision Rehab</h4>
                        <p className="text-[11px] text-slate-600 font-semibold">Therapy & Devices</p>
                    </div>
                </div>

                <div className="neu-card p-4 flex items-center gap-3">
                    <div className="w-10 h-10 neu-flat rounded-xl flex items-center justify-center text-amber-600 font-bold shrink-0"><Clock className="w-5 h-5" /></div>
                    <div>
                        <h4 className="text-xs font-black text-slate-900 uppercase">Direct OPD Tokens</h4>
                        <p className="text-[11px] text-emerald-700 font-extrabold">Instant Online Booking</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
