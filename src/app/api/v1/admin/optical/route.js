import { AdminOpticalController } from '@/core/Http/Controllers/Admin/AdminOpticalController.js';

export async function GET(request) {
  return await AdminOpticalController.getFrames(request);
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
