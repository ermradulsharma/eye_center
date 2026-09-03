import { SeedService } from '@/core/Services/SeedService.js';

export async function POST() {
  try {
    const result = await SeedService.seedInitialData();
    return Response.json(result);
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await SeedService.seedInitialData();
    return Response.json(result);
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
