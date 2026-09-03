import { AppointmentService } from '../../Services/AppointmentService.js';

export class AppointmentController {
  static async bookAppointment(req) {
    try {
      const body = await req.json();

      if (!body.patientName || !body.patientPhone || !body.doctorId || !body.appointmentDate || !body.timeSlot) {
        return Response.json(
          { success: false, message: 'Patient Name, Phone, Doctor, Date, and Time Slot are required.', error: 'VALIDATION_ERROR' },
          { status: 400 }
        );
      }

      const appointment = await AppointmentService.createAppointment(body);

      return Response.json(
        {
          success: true,
          message: `OPD Appointment booked successfully! Your Queue Token Number is ${appointment.tokenNumber}.`,
          data: appointment,
        },
        { status: 201 }
      );
    } catch (error) {
      return Response.json(
        { success: false, message: error.message || 'Failed to book OPD appointment.', error: 'SERVER_ERROR' },
        { status: 500 }
      );
    }
  }

  static async getAppointment(req) {
    try {
      const { searchParams } = new URL(req.url);
      const tokenNumber = searchParams.get('token');

      if (!tokenNumber) {
        return Response.json({ success: false, message: 'Token number required', error: 'VALIDATION_ERROR' }, { status: 400 });
      }

      const appointment = await AppointmentService.getAppointmentByToken(tokenNumber);
      if (!appointment) {
        return Response.json({ success: false, message: 'Appointment not found', error: 'NOT_FOUND' }, { status: 404 });
      }

      return Response.json({ success: true, data: appointment });
    } catch (error) {
      return Response.json({ success: false, message: error.message, error: 'SERVER_ERROR' }, { status: 500 });
    }
  }
}
