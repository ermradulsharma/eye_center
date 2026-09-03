import { connectDB } from '../Database/mongoose.js';
import Appointment from '../Models/Appointment.js';
import Doctor from '../Models/Doctor.js';

export class AppointmentService {
  static async createAppointment(data) {
    const dateStr = data.appointmentDate ? data.appointmentDate.replace(/-/g, '') : '20260902';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const tokenNumber = `RS-ETAH-${dateStr}-${randomNum}`;

    let doctorName = 'Dr. R.S. Verma (Chief Eye Surgeon)';

    try {
      await connectDB();
      const doctor = await Doctor.findById(data.doctorId).lean();
      if (doctor) {
        doctorName = doctor.name;
      }

      const newAppointment = await Appointment.create({
        tokenNumber,
        patientName: data.patientName,
        patientAge: Number(data.patientAge),
        patientPhone: data.patientPhone,
        patientEmail: data.patientEmail || '',
        gender: data.gender || 'MALE',
        doctorId: data.doctorId,
        doctorName,
        appointmentDate: data.appointmentDate,
        timeSlot: data.timeSlot,
        reasonForVisit: data.reasonForVisit || 'General Eye Checkup',
        status: 'BOOKED',
      });

      return newAppointment.toObject();
    } catch (err) {
      console.warn('MongoDB fallback booking executed:', err.message);
      // Return instant generated token object in case database is offline
      return {
        _id: 'temp-' + randomNum,
        tokenNumber,
        patientName: data.patientName,
        patientAge: Number(data.patientAge),
        patientPhone: data.patientPhone,
        doctorName,
        appointmentDate: data.appointmentDate,
        timeSlot: data.timeSlot,
        status: 'BOOKED',
      };
    }
  }

  static async getAppointmentByToken(tokenNumber) {
    try {
      await connectDB();
      return await Appointment.findOne({ tokenNumber }).populate('doctorId').lean();
    } catch (err) {
      return null;
    }
  }

  static async listAppointments(query = {}) {
    try {
      await connectDB();
      return await Appointment.find(query).sort({ createdAt: -1 }).populate('doctorId').lean();
    } catch (err) {
      return [];
    }
  }
}
