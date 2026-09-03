import { connectDB } from '../Database/mongoose.js';
import Doctor from '../Models/Doctor.js';

const FALLBACK_DOCTORS = [
  {
    _id: 'doc-1',
    name: 'Dr. R.S. Verma',
    title: 'Chief Medical Director & Chief Eye Surgeon',
    qualifications: 'MBBS, MS (Ophthalmology), FICO (UK), Fellowship in Cataract & Refractive Surgery',
    specialization: 'Micro-Incision Cataract (MICS), LASIK & Glaucoma Specialist',
    experienceYears: 22,
    opdSchedule: 'Mon - Sat: 9:30 AM - 2:00 PM & 4:30 PM - 7:00 PM',
    opdRoomNo: 'OPD Chamber 101',
    bio: '22+ years of surgical excellence in Cataract, LASIK, and Glaucoma care in Western UP.',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop',
    isAvailable: true,
  },
  {
    _id: 'doc-2',
    name: 'Dr. Ananya Sharma',
    title: 'Senior Retina & Pediatric Ophthalmology Specialist',
    qualifications: 'MBBS, MS (Ophthal), Fellowship in Retina & Vision Rehabilitation',
    specialization: 'Diabetic Retinopathy, Squint & Low Vision Rehabilitation',
    experienceYears: 14,
    opdSchedule: 'Mon - Fri: 10:00 AM - 4:00 PM',
    opdRoomNo: 'OPD Chamber 103',
    bio: 'Specialist in pediatric eye care, retinal laser therapies, and vision rehabilitation.',
    imageUrl: 'https://images.unsplash.com/photo-1594824813566-88855ce78905?q=80&w=600&auto=format&fit=crop',
    isAvailable: true,
  },
];

export class DoctorService {
  static async listDoctors() {
    try {
      await connectDB();
      const doctors = await Doctor.find({ isAvailable: true }).sort({ createdAt: -1 }).lean();
      if (doctors && doctors.length > 0) {
        return doctors;
      }
      return FALLBACK_DOCTORS;
    } catch (err) {
      console.warn('MongoDB connection error, serving fallback doctors:', err.message);
      return FALLBACK_DOCTORS;
    }
  }

  static async getDoctorById(id) {
    try {
      await connectDB();
      const doc = await Doctor.findById(id).lean();
      if (doc) return doc;
      return FALLBACK_DOCTORS.find((d) => d._id === id) || FALLBACK_DOCTORS[0];
    } catch (err) {
      return FALLBACK_DOCTORS.find((d) => d._id === id) || FALLBACK_DOCTORS[0];
    }
  }
}
