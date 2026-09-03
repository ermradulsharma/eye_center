import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema(
  {
    tokenNumber: { type: String, required: true, unique: true },
    patientName: { type: String, required: true, trim: true },
    patientAge: { type: Number, required: true },
    patientPhone: { type: String, required: true, trim: true },
    patientEmail: { type: String, trim: true, default: '' },
    gender: { type: String, enum: ['MALE', 'FEMALE', 'OTHER'], default: 'MALE' },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    doctorName: { type: String, required: true },
    appointmentDate: { type: String, required: true }, // YYYY-MM-DD
    timeSlot: { type: String, required: true }, // e.g. "10:00 AM - 11:00 AM"
    reasonForVisit: { type: String, default: 'General OPD Eye Checkup' },
    status: {
      type: String,
      enum: ['BOOKED', 'CONFIRMED', 'COMPLETED', 'CANCELLED'],
      default: 'BOOKED',
    },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

AppointmentSchema.index({ tokenNumber: 1, patientPhone: 1, appointmentDate: 1 });

export default mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);
