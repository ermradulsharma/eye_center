'use client';

import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useAdminData } from '@/hooks/useAdminData.js';

// Import Modular Admin UI Sub-Components
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminOverviewTab from '@/components/admin/AdminOverviewTab';
import AdminQueueTab from '@/components/admin/AdminQueueTab';
import AdminOpticalTab from '@/components/admin/AdminOpticalTab';
import AddFrameModal from '@/components/admin/AddFrameModal';
import AdminFooter from '@/components/admin/AdminFooter';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddFrameModalOpen, setIsAddFrameModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [msg, setMsg] = useState(null);

  // Custom Data Hook (Zero raw fetch calls in Page component)
  const {
    frames,
    appointments,
    loading,
    refreshData,
    createOpticalFrame,
    deleteOpticalFrame,
    updateAppointmentStatus,
  } = useAdminData();

  // Clean Form State for Adding Optical Frame
  const [newFrame, setNewFrame] = useState({
    name: '',
    brand: '',
    category: 'FRAMES',
    lensType: '',
    frameShape: '',
    material: '',
    priceRange: '',
    description: '',
    imageUrl: '',
    isTrending: true,
  });

  const handleCreateFrame = async (e) => {
    e.preventDefault();
    if (!newFrame.name) return;

    try {
      await createOpticalFrame(newFrame);
      setMsg('New optical frame successfully added to hospital catalog!');
      setIsAddFrameModalOpen(false);
      setNewFrame({
        name: '',
        brand: '',
        category: 'FRAMES',
        lensType: '',
        frameShape: '',
        material: '',
        priceRange: '',
        description: '',
        imageUrl: '',
        isTrending: true,
      });
    } catch (err) {
      setMsg(err.message || 'Failed to add frame item.');
    }
  };

  const handleDeleteFrame = async (id) => {
    if (!confirm('Remove this frame item from hospital store?')) return;
    try {
      await deleteOpticalFrame(id);
      setMsg('Item removed from catalog successfully.');
    } catch (err) {
      setMsg(err.message || 'Error deleting item.');
    }
  };

  const handleUpdateApptStatus = async (id, status) => {
    try {
      await updateAppointmentStatus(id, status);
      setMsg(`Patient Queue Token updated to: ${status}`);
    } catch (err) {
      setMsg(err.message || 'Error updating appointment status.');
    }
  };

  // Filtered Lists
  const filteredFrames = frames.filter((f) =>
    f.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAppointments = appointments.filter((a) => {
    const matchesSearch =
      a.patientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tokenNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.patientPhone?.includes(searchQuery);
    const matchesStatus = statusFilter === 'ALL' || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = appointments.filter((a) => a.status === 'BOOKED').length;
  const completedCount = appointments.filter((a) => a.status === 'COMPLETED').length;

  return (
    <div className="min-h-screen bg-[#ebf1f6] text-[#0f172a] flex flex-col md:flex-row font-sans selection:bg-sky-200 antialiased">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-950/70 z-40 md:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 1. Sidebar Component */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        framesCount={frames.length}
        appointmentsCount={appointments.length}
        pendingCount={pendingCount}
      />

      {/* 2. Main Executive Content Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar Header Component */}
        <AdminHeader
          activeTab={activeTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setIsSidebarOpen={setIsSidebarOpen}
          setIsAddFrameModalOpen={setIsAddFrameModalOpen}
          fetchAdminData={refreshData}
          loading={loading}
        />

        {/* Dashboard Main Content Body */}
        <main className="flex-1 p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* Action Notification Banner */}
          {msg && (
            <div className="neu-card p-4 bg-sky-50/90 border-l-4 border-sky-600 text-sky-950 font-bold text-xs flex justify-between items-center animate-fade-in shadow-xs">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-sky-600 shrink-0" />
                <span>{msg}</span>
              </div>
              <button onClick={() => setMsg(null)} className="text-xs font-black text-sky-800 hover:underline">Dismiss</button>
            </div>
          )}

          {/* TAB 1: OVERVIEW ANALYTICS */}
          {activeTab === 'overview' && (
            <AdminOverviewTab
              appointments={appointments}
              frames={frames}
              pendingCount={pendingCount}
              completedCount={completedCount}
              setActiveTab={setActiveTab}
            />
          )}

          {/* TAB 2: PATIENT OPD QUEUE */}
          {activeTab === 'appointments' && (
            <AdminQueueTab
              filteredAppointments={filteredAppointments}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              handleUpdateApptStatus={handleUpdateApptStatus}
            />
          )}

          {/* TAB 3: OPTICAL STORE CATALOG */}
          {activeTab === 'optical' && (
            <AdminOpticalTab
              filteredFrames={filteredFrames}
              setIsAddFrameModalOpen={setIsAddFrameModalOpen}
              handleDeleteFrame={handleDeleteFrame}
            />
          )}
        </main>

        {/* 3. Footer Component */}
        <AdminFooter />
      </div>

      {/* 4. Add Optical Frame Modal Drawer */}
      <AddFrameModal
        isOpen={isAddFrameModalOpen}
        onClose={() => setIsAddFrameModalOpen(false)}
        newFrame={newFrame}
        setNewFrame={setNewFrame}
        handleCreateFrame={handleCreateFrame}
      />
    </div>
  );
}
