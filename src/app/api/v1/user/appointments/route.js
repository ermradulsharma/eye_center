import { AppointmentController } from '@/core/Http/Controllers/AppointmentController.js';

export async function POST(request) {
  return await AppointmentController.bookAppointment(request);
}

export async function GET(request) {
  return await AppointmentController.getAppointment(request);
}
