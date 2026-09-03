import { TreatmentController } from '@/core/Http/Controllers/TreatmentController.js';

export async function GET() {
  return await TreatmentController.getTreatments();
}
