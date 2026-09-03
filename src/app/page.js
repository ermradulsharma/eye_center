'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import BentoGridServices from '@/components/BentoGridServices';
import DoctorSection from '@/components/DoctorSection';
import OpticalShowcase from '@/components/OpticalShowcase';
import AppointmentModal from '@/components/AppointmentModal';
import Footer from '@/components/Footer';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState('');

  // 1. Initial Seed trigger (populates 10 optical products into MongoDB if empty)
  useSWR('/api/v1/user/seed', (url) => fetch(url, { method: 'POST' }).catch(() => {}));

  // 2. Fetch active doctors via SWR
  const { data: doctorsData } = useSWR('/api/v1/user/doctors', fetcher, { revalidateOnFocus: false });
  const doctors = doctorsData?.success ? doctorsData.data : [];

  // 3. Fetch treatments & optical frames via SWR
  const { data: treatmentsData } = useSWR('/api/v1/user/treatments', fetcher, { revalidateOnFocus: false });
  const opticalFrames = treatmentsData?.success && treatmentsData.data?.opticalFrames ? treatmentsData.data.opticalFrames : [];

  const handleOpenBooking = (doctorId = '') => {
    setSelectedDoctorId(doctorId);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#ebf1f6] text-[#0f172a] selection:bg-sky-200 selection:text-sky-900">
      {/* Navigation Bar */}
      <Navbar onOpenBooking={() => handleOpenBooking('')} />

      {/* Hero Interactive Neumorphic Banner Slider */}
      <HeroBanner onOpenBooking={() => handleOpenBooking('')} />

      {/* Bento Grid Services & Treatments Showcase */}
      <BentoGridServices onOpenBooking={() => handleOpenBooking('')} />

      {/* Ophthalmologist Doctor Profiles */}
      <DoctorSection doctors={doctors} onOpenBooking={handleOpenBooking} />

      {/* Optical Frames & Power Lenses Store */}
      <OpticalShowcase opticalFrames={opticalFrames} onOpenBooking={() => handleOpenBooking('')} />

      {/* OPD Appointment Registration Modal */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        doctors={doctors}
        selectedDoctorId={selectedDoctorId}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
