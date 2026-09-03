'use client';

import useSWR, { mutate } from 'swr';
import { apiRequest } from '@/services/apiClient.js';

const fetcher = (url) => fetch(url).then((res) => res.json());

export function useAdminData() {
  const { data: framesData, isLoading: framesLoading, error: framesError } = useSWR('/api/v1/admin/optical', fetcher);
  const { data: apptsData, isLoading: apptsLoading, error: apptsError } = useSWR('/api/v1/admin/appointments', fetcher);

  const frames = framesData?.success ? (framesData.data || []) : [];
  const appointments = apptsData?.success ? (apptsData.data?.items || apptsData.data || []) : [];
  const loading = framesLoading || apptsLoading;

  const refreshData = () => {
    mutate('/api/v1/admin/optical');
    mutate('/api/v1/admin/appointments');
  };

  const createOpticalFrame = async (framePayload) => {
    const result = await apiRequest('/api/v1/admin/optical', 'POST', framePayload);
    refreshData();
    return result;
  };

  const deleteOpticalFrame = async (frameId) => {
    const result = await apiRequest(`/api/v1/admin/optical?id=${frameId}`, 'DELETE');
    refreshData();
    return result;
  };

  const updateAppointmentStatus = async (appointmentId, status) => {
    const result = await apiRequest('/api/v1/admin/appointments', 'PUT', { id: appointmentId, status });
    refreshData();
    return result;
  };

  return {
    frames,
    appointments,
    loading,
    error: framesError || apptsError,
    refreshData,
    createOpticalFrame,
    deleteOpticalFrame,
    updateAppointmentStatus,
  };
}
