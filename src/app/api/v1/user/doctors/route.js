import { DoctorController } from '@/core/Http/Controllers/DoctorController.js';

export async function GET() {
  return await DoctorController.getDoctors();
}
