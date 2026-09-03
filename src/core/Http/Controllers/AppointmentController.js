import { AppointmentService } from '../../Services/AppointmentService.js';
import { sanitizeNoSQL, appointmentBookingSchema } from '../Middleware/security.js';
import { logger } from '../../Logger/pino.js';

export class AppointmentController {
  static async bookAppointment(req) {
    try {
      const rawBody = await req.json();
      const body = sanitizeNoSQL(rawBody);

      const validation = appointmentBookingSchema.safeParse(body);
      if (!validation.success) {
        return Response.json(
          {
            success: false,
            message: 'Validation Error: Please check all required fields.',
            error: 'VALIDATION_ERROR',
            details: validation.error.format(),
          },
          { status: 400 }
        );
      }

      const appointment = await AppointmentService.createAppointment(validation.data);

      return Response.json(
        {
          success: true,
          message: `OPD Appointment booked successfully! Your Queue Token Number is ${appointment.tokenNumber}.`,
          data: appointment,
        },
        { status: 201 }
      );
    } catch (error) {
      logger.error({ error: error.message }, 'Failed to book OPD appointment');
      return Response.json(
        { success: false, message: error.message || 'Failed to book OPD appointment.', error: 'SERVER_ERROR' },
        { status: 500 }
      );
    }
  }

  static async getAppointment(req) {
    try {
      const { searchParams } = new URL(req.url);
      const rawToken = searchParams.get('token');
      const tokenNumber = sanitizeNoSQL(rawToken);

      if (!tokenNumber) {
        return Response.json({ success: false, message: 'Token number required', error: 'VALIDATION_ERROR' }, { status: 400 });
      }

      const appointment = await AppointmentService.getAppointmentByToken(tokenNumber);
      if (!appointment) {
        return Response.json({ success: false, message: 'Appointment not found', error: 'NOT_FOUND' }, { status: 404 });
      }

      return Response.json({ success: true, data: appointment });
    } catch (error) {
      logger.error({ error: error.message }, 'Error retrieving appointment');
      return Response.json({ success: false, message: error.message, error: 'SERVER_ERROR' }, { status: 500 });
    }
  }
}
