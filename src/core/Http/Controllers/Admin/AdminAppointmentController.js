import { AdminAppointmentService } from '../../../Services/Admin/AdminAppointmentService.js';
import { authenticateRole } from '../../Middleware/auth.js';
import { sanitizeNoSQL } from '../../Middleware/security.js';
import { logger } from '../../../Logger/pino.js';

export class AdminAppointmentController {
  static async getAppointments(req) {
    try {
      const auth = authenticateRole(req, ['ADMIN']);
      if (!auth.authenticated) return auth.errorResponse;

      const result = await AdminAppointmentService.listAllAppointments();
      const appointments = result.items || result;

      return Response.json({
        success: true,
        data: appointments,
        meta: {
          pagination: {
            page: 1,
            limit: appointments.length,
            total: appointments.length,
          },
        },
      });
    } catch (err) {
      logger.error({ error: err.message }, 'Admin error fetching appointments');
      return Response.json({ success: false, message: err.message, error: 'SERVER_ERROR' }, { status: 500 });
    }
  }

  static async updateStatus(req) {
    try {
      const auth = authenticateRole(req, ['ADMIN']);
      if (!auth.authenticated) return auth.errorResponse;

      const rawBody = await req.json();
      const body = sanitizeNoSQL(rawBody);

      if (!body.id || !body.status) {
        return Response.json({ success: false, message: 'ID and Status are required.', error: 'VALIDATION_ERROR' }, { status: 400 });
      }

      const updated = await AdminAppointmentService.updateStatus(body.id, body.status);
      logger.info({ appointmentId: body.id, status: body.status }, 'Admin updated appointment status');

      return Response.json({ success: true, message: `Appointment status updated to ${body.status}`, data: updated });
    } catch (err) {
      logger.error({ error: err.message }, 'Admin error updating appointment status');
      return Response.json({ success: false, message: err.message, error: 'SERVER_ERROR' }, { status: 500 });
    }
  }
}
