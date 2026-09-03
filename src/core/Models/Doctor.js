import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    title: { type: String, required: true, default: 'Senior Ophthalmologist' },
    qualifications: { type: String, required: true }, // e.g. "MBBS, MS (Ophthalmology), Fellowship in Retina"
    specialization: { type: String, required: true }, // e.g. "Cataract & Refractive Surgery"
    experienceYears: { type: Number, required: true, default: 10 },
    opdSchedule: { type: String, required: true, default: 'Mon - Sat: 9:00 AM - 5:00 PM' },
    opdRoomNo: { type: String, default: 'OPD Room 102' },
    bio: { type: String, required: true },
    imageUrl: { type: String, default: '/images/doctor-placeholder.jpg' },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

DoctorSchema.index({ name: 'text', specialization: 'text', qualifications: 'text' });

export default mongoose.models.Doctor || mongoose.model('Doctor', DoctorSchema);
