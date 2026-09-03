import { AdminAppointmentController } from '@/core/Http/Controllers/Admin/AdminAppointmentController.js';

export async function GET() {
  return await AdminAppointmentController.getAppointments();
}

export async function PUT(request) {
  return await AdminAppointmentController.updateStatus(request);
}
