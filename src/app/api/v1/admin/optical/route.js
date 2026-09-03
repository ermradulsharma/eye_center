import { AdminOpticalController } from '@/core/Http/Controllers/Admin/AdminOpticalController.js';

export async function GET() {
  return await AdminOpticalController.getFrames();
}

export async function POST(request) {
  return await AdminOpticalController.createFrame(request);
}

export async function PUT(request) {
  return await AdminOpticalController.updateFrame(request);
}

export async function DELETE(request) {
  return await AdminOpticalController.deleteFrame(request);
}
