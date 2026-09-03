'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import BentoGridServices from '@/components/BentoGridServices';
import DoctorSection from '@/components/DoctorSection';
import OpticalShowcase from '@/components/OpticalShowcase';
import AppointmentModal from '@/components/AppointmentModal';
import Footer from '@/components/Footer';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [opticalFrames, setOpticalFrames] = useState([]);

  useEffect(() => {
    // 1. Initial Seed Data check
    fetch('/api/v1/user/seed', { method: 'POST' }).catch(() => {});

    // 2. Fetch active doctors
    fetch('/api/v1/user/doctors')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setDoctors(json.data);
        }
      })
      .catch(() => {});

    // 3. Fetch treatments and optical frames
    fetch('/api/v1/user/treatments')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          if (json.data.opticalFrames) {
            setOpticalFrames(json.data.opticalFrames);
          }
        }
      })
      .catch(() => {});
  }, []);

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
