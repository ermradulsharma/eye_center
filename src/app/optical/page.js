'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AppointmentModal from '@/components/AppointmentModal';
import { Glasses, Search, Check, ShoppingBag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const fetcher = (url) => fetch(url).then((res) => res.json());

const INITIAL_PRODUCTS = [
  {
    _id: 'prod-1',
    name: 'RS Titanium Rimless UltraLite Air',
    brand: 'RS Signature Premium',
    category: 'FRAMES',
    lensType: 'Blue Cut Digital Anti-Glare Lens',
    frameShape: 'Rectangle / Sleek Rimless',
    material: 'Pure Japanese Titanium (Featherweight 8g)',
    priceRange: '₹1,499 - ₹3,499',
    description: 'Featherweight pure titanium rimless specs designed for all-day computer screen work and ear comfort.',
    imageUrl: '/images/optical_titanium_specs.jpg',
    isTrending: true,
  },
  {
    _id: 'prod-2',
    name: 'RS Flexi-Shield Acetate Prescription Frame',
    brand: 'RS Ergonomic Optical',
    category: 'FRAMES',
    lensType: 'Progressive HD Multi-Focal Compatible',
    frameShape: 'Classic Wayfarer / Oval',
    material: 'High-Grade Flexible Italian Acetate',
    priceRange: '₹999 - ₹2,499',
    description: 'Durable flex-hinge frame ideal for active daily use, reading, and multifocal prescriptions.',
    imageUrl: '/images/optical_acetate_frames.jpg',
    isTrending: true,
  },
  {
    _id: 'prod-3',
    name: 'RS BlueGuard Digital Anti-Glare Lenses',
    brand: 'RS Power Lens Series',
    category: 'POWER_LENSES',
    lensType: 'Blue Light Filtering + Anti-Reflective Coating',
    frameShape: 'Universal Fitting',
    material: 'High Index Polycarbonate 1.67',
    priceRange: '₹799 - ₹1,999',
    description: 'Blocks harmful blue light emitted from mobiles, laptops, and LED screens to reduce eye fatigue.',
    imageUrl: '/images/optical_titanium_specs.jpg',
    isTrending: true,
  },
  {
    _id: 'prod-4',
    name: 'RS AirFit Minimalist Half-Rim Glasses',
    brand: 'RS Signature Premium',
    category: 'FRAMES',
    lensType: 'Anti-Reflective Single Vision Lens',
    frameShape: 'Rectangle Half-Rim',
    material: 'Stainless Steel Alloy',
    priceRange: '₹1,299 - ₹2,799',
    description: 'Professional executive half-rim frame with spring hinges and adjustable nose pads.',
    imageUrl: '/images/optical_titanium_specs.jpg',
    isTrending: false,
  },
  {
    _id: 'prod-5',
    name: 'RS Progressive Max Clear Vision Lenses',
    brand: 'RS Power Lens Series',
    category: 'POWER_LENSES',
    lensType: 'No-Line Seamless Progressive Multi-Focal',
    frameShape: 'Universal Fitting',
    material: 'High Index Resin 1.60',
    priceRange: '₹1,899 - ₹4,499',
    description: 'Smooth transition between distance, intermediate, and near reading powers without line distraction.',
    imageUrl: '/images/optical_acetate_frames.jpg',
    isTrending: true,
  },
  {
    _id: 'prod-6',
    name: 'RS Polarized UV400 Prescription Sunglasses',
    brand: 'RS Urban Sunwear',
    category: 'SUNGLASSES',
    lensType: 'Category 3 Polarized UV400 Protection',
    frameShape: 'Aviator / Square',
    material: 'TR90 Matte Finish',
    priceRange: '₹1,199 - ₹2,899',
    description: 'Polarized glare reduction sunglasses compatible with custom prescription power lenses.',
    imageUrl: '/images/optical_sunglasses.jpg',
    isTrending: true,
  },
  {
    _id: 'prod-7',
    name: 'RS Junior Flex Unbreakable Kids Specs',
    brand: 'RS Kids Care',
    category: 'KIDS_GLASSES',
    lensType: 'Impact Resistant Polycarbonate Safety Lens',
    frameShape: 'Round Ergonomic',
    material: 'Non-Toxic Soft Silicone & TR90',
    priceRange: '₹699 - ₹1,599',
    description: 'Flexible, bendable, non-toxic frames designed for active children aged 3-12 years.',
    imageUrl: '/images/optical_acetate_frames.jpg',
    isTrending: false,
  },
  {
    _id: 'prod-8',
    name: 'RS Vintage Browline Acetate Frame',
    brand: 'RS Heritage Series',
    category: 'FRAMES',
    lensType: 'Photochromic Transition (Light to Dark)',
    frameShape: 'Clubmaster / Browline',
    material: 'Handcrafted Acetate & Metal Accent',
    priceRange: '₹1,599 - ₹3,299',
    description: 'Vintage retro browline frame suitable for transition lenses and formal wear.',
    imageUrl: '/images/optical_acetate_frames.jpg',
    isTrending: false,
  },
  {
    _id: 'prod-9',
    name: 'RS PhotoMax Day-Night Transition Lenses',
    brand: 'RS Power Lens Series',
    category: 'POWER_LENSES',
    lensType: 'Fast Reacting Photochromic UV Sensing',
    frameShape: 'Universal Fitting',
    material: 'Trivex High-Impact Resistance',
    priceRange: '₹1,399 - ₹3,199',
    description: 'Automatically darkens outdoors under sunlight and clears indoors instantly.',
    imageUrl: '/images/optical_titanium_specs.jpg',
    isTrending: true,
  },
  {
    _id: 'prod-10',
    name: 'RS SportFlex Wrap-Around Prescription Glasses',
    brand: 'RS Active Sports',
    category: 'SUNGLASSES',
    lensType: 'Anti-Fog Scratch-Resistant Hard Coat',
    frameShape: 'Curved Sport Wrap',
    material: 'TR90 Thermoplastic',
    priceRange: '₹1,499 - ₹2,999',
    description: 'Ergonomic wrap-around frame with sweat-resistant grip for sports and outdoor driving.',
    imageUrl: '/images/optical_sunglasses.jpg',
    isTrending: false,
  },
];

export default function OpticalStorePage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // SWR Data Fetching
  const { data: treatmentsData } = useSWR('/api/v1/user/treatments', fetcher, { revalidateOnFocus: false });
  const { data: doctorsData } = useSWR('/api/v1/user/doctors', fetcher, { revalidateOnFocus: false });

  const fetchedFrames = treatmentsData?.success && treatmentsData.data?.opticalFrames ? treatmentsData.data.opticalFrames : [];
  const opticalFrames = fetchedFrames.length > 0 ? fetchedFrames : INITIAL_PRODUCTS;
  const doctors = doctorsData?.success ? doctorsData.data : [];

  const filteredFrames = opticalFrames.filter((item) => {
    const matchesCat = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesQuery =
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-[#ebf1f6] text-[#0f172a]">
      <Navbar onOpenBooking={() => setIsModalOpen(true)} />

      {/* Header Banner */}
      <section className="bg-[#0f172a] text-white py-12 px-4 border-b-4 border-sky-600">
        <div className="max-w-7xl mx-auto space-y-4">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:underline neu-btn px-3 py-1.5 text-slate-800">
            <ArrowLeft className="w-4 h-4 text-sky-400" /> Back to Hospital Home
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
              <div key={item._id || item.name} className="neu-card p-6 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-full h-52 rounded-xl overflow-hidden neu-flat relative">
                    <img src={item.imageUrl || '/images/optical_titanium_specs.jpg'} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
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

      <AppointmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} doctors={doctors} />
      <Footer />
    </div>
  );
}
