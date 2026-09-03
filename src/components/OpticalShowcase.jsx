'use client';

import React from 'react';
import { Glasses, Check, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function OpticalShowcase({ opticalFrames = [], onOpenBooking }) {
  const defaultFrames = [
    {
      _id: 'frame-1',
      name: 'RS Titanium UltraLite Air Frame',
      brand: 'RS Signature Premium',
      category: 'FRAMES',
      lensType: 'Blue Cut Digital Anti-Glare Lens',
      frameShape: 'Rectangle / Sleek Rimless',
      material: 'Pure Japanese Titanium (Featherweight 8g)',
      priceRange: '₹1,499 - ₹3,499',
      description: 'Ultra-lightweight titanium frame designed for computer screen work and maximum ear comfort.',
      imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop',
    },
    {
      _id: 'frame-2',
      name: 'RS Flexi-Shield Prescription Frame',
      brand: 'RS Ergonomic Optical',
      category: 'FRAMES',
      lensType: 'Progressive HD Multi-Focal Lens Compatible',
      frameShape: 'Classic Wayfarer / Oval',
      material: 'Flexible Italian Acetate',
      priceRange: '₹999 - ₹2,499',
      description: 'Unbreakable flex-hinge frame ideal for active daily use, reading, and multifocal lenses.',
      imageUrl: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=600&auto=format&fit=crop',
    },
    {
      _id: 'frame-3',
      name: 'RS BlueGuard Digital Anti-Glare Power Lens',
      brand: 'RS Power Lens Series',
      category: 'POWER_LENSES',
      lensType: 'Blue Light Filtering + Anti-Reflective Coating',
      frameShape: 'Universal Fit',
      material: 'High Index Polycarbonate 1.67',
      priceRange: '₹799 - ₹1,999',
      description: 'Blocks harmful blue light emitted from mobiles, laptops, and LED screens to reduce eye strain.',
      imageUrl: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=600&auto=format&fit=crop',
    },
  ];

  const list = opticalFrames.length > 0 ? opticalFrames : defaultFrames;

  return (
    <section id="optical-catalog" className="py-12 md:py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
        <h2 className="text-xs font-black uppercase tracking-widest text-indigo-600 neu-flat inline-block px-4 py-1.5 rounded-full">
          In-House Hospital Optical Store
        </h2>
        <h3 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight">
          Precision Prescription Glasses & Frames
        </h3>
        <p className="text-sm md:text-base text-slate-600 font-medium">
          डॉक्टर द्वारा जांची गई सटीक पावर के अनुसार तैयार चश्मे, ब्लू-कट प्रोटेक्शन शीशे और ब्रांडेड फ्रेम्स।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {list.map((item) => (
          <div key={item._id} className="neu-card p-6 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-full h-48 rounded-xl overflow-hidden neu-flat relative">
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute top-3 right-3 bg-slate-900/90 text-white text-xs font-extrabold px-3 py-1 rounded-full backdrop-blur-md">
                  {item.priceRange}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-indigo-700 bg-indigo-100 px-2.5 py-0.5 rounded-md inline-block mb-1">
                  {item.brand}
                </span>
                <h4 className="text-lg font-black text-slate-900 leading-snug">{item.name}</h4>
                <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">{item.description}</p>
              </div>

              <div className="neu-flat p-3 rounded-xl space-y-1 text-xs font-bold text-slate-700">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> {item.lensType}
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> Material: {item.material}
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={onOpenBooking}
                className="neu-btn w-full py-2.5 text-xs font-extrabold flex items-center justify-center gap-2 text-indigo-700"
              >
                <ShoppingBag className="w-4 h-4" /> Book Frame Trial at Hospital
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-10">
        <Link
          href="/optical"
          className="neu-btn-accent px-8 py-3.5 text-sm font-extrabold inline-flex items-center gap-2"
        >
          <Glasses className="w-5 h-5" /> View Full Optical Store Catalog & Search
        </Link>
      </div>
    </section>
  );
}
