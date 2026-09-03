import { connectDB } from '../../Database/mongoose.js';
import Appointment from '../../Models/Appointment.js';

export class AdminAppointmentService {
  static async listAllAppointments() {
    try {
      await connectDB();
      return await Appointment.find().sort({ createdAt: -1 }).populate('doctorId').lean();
    } catch (err) {
      return [];
    }
  }

  static async updateStatus(id, status) {
    await connectDB();
    const updated = await Appointment.findByIdAndUpdate(id, { status }, { new: true }).lean();
    return updated;
  }
}
