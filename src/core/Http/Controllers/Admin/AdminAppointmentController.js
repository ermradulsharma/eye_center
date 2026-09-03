import { AdminAppointmentService } from '../../../Services/Admin/AdminAppointmentService.js';

export class AdminAppointmentController {
  static async getAppointments() {
    try {
      const appointments = await AdminAppointmentService.listAllAppointments();
      return Response.json({ success: true, data: appointments });
    } catch (err) {
      return Response.json({ success: false, message: err.message }, { status: 500 });
    }
  }

  static async updateStatus(req) {
    try {
      const body = await req.json();
      if (!body.id || !body.status) {
        return Response.json({ success: false, message: 'ID and Status are required.' }, { status: 400 });
      }
      const updated = await AdminAppointmentService.updateStatus(body.id, body.status);
      return Response.json({ success: true, message: `Appointment status updated to ${body.status}`, data: updated });
    } catch (err) {
      return Response.json({ success: false, message: err.message }, { status: 500 });
    }
  }
}
