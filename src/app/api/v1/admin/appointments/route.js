import { AdminAppointmentController } from '@/core/Http/Controllers/Admin/AdminAppointmentController.js';

export async function GET(request) {
  return await AdminAppointmentController.getAppointments(request);
}

export async function PUT(request) {
  return await AdminAppointmentController.updateStatus(request);
}
