import { AdminOpticalService } from '../../../Services/Admin/AdminOpticalService.js';

export class AdminOpticalController {
  static async getFrames() {
    try {
      const frames = await AdminOpticalService.listAllFrames();
      return Response.json({ success: true, data: frames });
    } catch (err) {
      return Response.json({ success: false, message: err.message }, { status: 500 });
    }
  }

  static async createFrame(req) {
    try {
      const body = await req.json();
      if (!body.name) {
        return Response.json({ success: false, message: 'Frame Name is required.' }, { status: 400 });
      }
      const newFrame = await AdminOpticalService.createFrame(body);
      return Response.json({ success: true, message: 'New Frame added to store!', data: newFrame }, { status: 201 });
    } catch (err) {
      return Response.json({ success: false, message: err.message }, { status: 500 });
    }
  }

  static async updateFrame(req) {
    try {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
      const body = await req.json();
      const updated = await AdminOpticalService.updateFrame(id, body);
      return Response.json({ success: true, message: 'Frame updated successfully', data: updated });
    } catch (err) {
      return Response.json({ success: false, message: err.message }, { status: 500 });
    }
  }

  static async deleteFrame(req) {
    try {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
      await AdminOpticalService.deleteFrame(id);
      return Response.json({ success: true, message: 'Frame deleted successfully' });
    } catch (err) {
      return Response.json({ success: false, message: err.message }, { status: 500 });
    }
  }
}
