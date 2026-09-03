import { connectDB } from '../Database/mongoose.js';
import Doctor from '../Models/Doctor.js';
import EyeTreatment from '../Models/EyeTreatment.js';
import OpticalFrame from '../Models/OpticalFrame.js';

export class SeedService {
  static async seedInitialData() {
    await connectDB();

    // 1. Seed Doctors
    const doctorCount = await Doctor.countDocuments();
    if (doctorCount === 0) {
      await Doctor.insertMany([
        {
          name: 'Dr. R.S. Verma',
          title: 'Chief Medical Director & Chief Eye Surgeon',
          qualifications: 'MBBS, MS (Ophthalmology), FICO (UK), Fellowship in Cataract & Refractive Surgery',
          specialization: 'Micro-Incision Cataract (MICS), LASIK & Glaucoma Specialist',
          experienceYears: 22,
          opdSchedule: 'Mon - Sat: 9:30 AM - 2:00 PM & 4:30 PM - 7:00 PM',
          opdRoomNo: 'OPD Chamber 101',
          bio: 'Dr. R.S. Verma is a renowned Senior Ophthalmologist in Western UP with over 22 years of surgical excellence in Cataract, LASIK, and Glaucoma care.',
          imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop',
          isAvailable: true,
        },
        {
          name: 'Dr. Ananya Sharma',
          title: 'Senior Retina & Pediatric Ophthalmology Specialist',
          qualifications: 'MBBS, MS (Ophthal), Fellowship in Retina & Vision Rehabilitation',
          specialization: 'Diabetic Retinopathy, Squint & Low Vision Rehabilitation',
          experienceYears: 14,
          opdSchedule: 'Mon - Fri: 10:00 AM - 4:00 PM',
          opdRoomNo: 'OPD Chamber 103',
          bio: 'Dr. Ananya Sharma specializes in pediatric eye care, retinal laser therapies, and vision rehabilitation for patients with partial vision loss.',
          imageUrl: 'https://images.unsplash.com/photo-1594824813566-88855ce78905?q=80&w=600&auto=format&fit=crop',
          isAvailable: true,
        },
      ]);
    }

    // 2. Seed Eye Treatments
    const treatmentCount = await EyeTreatment.countDocuments();
    if (treatmentCount === 0) {
      await EyeTreatment.insertMany([
        {
          title: 'Micro-Incision Cataract Surgery (MICS)',
          slug: 'mics-cataract-surgery',
          category: 'CATARACT',
          shortDescription: 'Blade-free, stitchless cataract removal with imported premium Foldable Intraocular Lenses (IOL).',
          fullDescription: 'Advanced Phacoemulsification technique providing same-day recovery, zero hospital stay, and crystal-clear distance & near vision.',
          benefits: ['No Injection, No Stitch, No Bandage', 'Quick 15-Minute Procedure', 'Same Day Discharge', 'Multifocal & Toric IOL Options'],
          iconName: 'Eye',
          isFeatured: true,
        },
        {
          title: 'LASIK & Contoura Vision Refractive Surgery',
          slug: 'lasik-contoura-vision',
          category: 'LASIK_REFRACTIVE',
          shortDescription: 'Permanent freedom from spectacles and contact lenses with high-precision laser correction.',
          fullDescription: 'Customized topography-guided laser vision correction tailored to your unique corneal curvature for sharper visual acuity.',
          benefits: ['100% Painless Laser Technique', 'HD Vision Clarity', 'Instant Spectacle Removal', 'FDA Approved Technology'],
          iconName: 'Sparkles',
          isFeatured: true,
        },
        {
          title: 'Glaucoma & Intraocular Pressure Care',
          slug: 'glaucoma-care-management',
          category: 'GLAUCOMA',
          shortDescription: 'Early detection, OCT nerve scan, and advanced medical & surgical management of Silent Sight Thief.',
          fullDescription: 'Comprehensive glaucoma screening using automated perimeter and OCT imaging to preserve optic nerve health.',
          benefits: ['Automated Visual Field Testing', 'Optic Nerve OCT Mapping', 'Laser Trabeculoplasty', 'Targeted Pressure Control'],
          iconName: 'ShieldCheck',
          isFeatured: true,
        },
        {
          title: 'Low Vision & Blindness Rehabilitation',
          slug: 'vision-rehabilitation-center',
          category: 'VISION_REHAB',
          shortDescription: 'Specialized therapy, optical magnifiers, and assistive devices for low vision patients.',
          fullDescription: 'Comprehensive rehabilitation therapy helping individuals with severe visual impairment regain independence in daily living.',
          benefits: ['Electronic & Optical Magnifiers', 'Contrast Enhancement Training', 'Orientation & Mobility Guidance', 'Adaptive Daily Life Skills'],
          iconName: 'Activity',
          isFeatured: true,
        },
      ]);
    }

    // 3. Seed Optical Frames & Power Lenses
    const frameCount = await OpticalFrame.countDocuments();
    if (frameCount === 0) {
      await OpticalFrame.insertMany([
        {
          name: 'RS Titanium UltraLite Air Frame',
          brand: 'RS Signature Premium',
          category: 'FRAMES',
          lensType: 'Blue Cut Digital Anti-Glare Lens',
          frameShape: 'Rectangle / Sleek Rimless',
          material: 'Pure Japanese Titanium (Featherweight 8g)',
          priceRange: '₹1,499 - ₹3,499',
          description: 'Ultra-lightweight titanium frame designed for all-day computer screen work and maximum ear comfort.',
          imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop',
          isTrending: true,
        },
        {
          name: 'RS Flexi-Shield Acetate Prescription Frame',
          brand: 'RS Ergonomic Optical',
          category: 'FRAMES',
          lensType: 'Progressive HD Multi-Focal Lens Compatible',
          frameShape: 'Classic Wayfarer / Oval',
          material: 'High-Grade Flexible Italian Acetate',
          priceRange: '₹999 - ₹2,499',
          description: 'Durable, unbreakable flex-hinge frame ideal for active daily use, reading, and multifocal lenses.',
          imageUrl: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=600&auto=format&fit=crop',
          isTrending: true,
        },
        {
          name: 'RS BlueGuard Digital Anti-Glare Lenses',
          brand: 'RS Power Lens Series',
          category: 'POWER_LENSES',
          lensType: 'Blue Light Filtering + Hydrophobic Anti-Reflective',
          frameShape: 'Universal Lens Fitting',
          material: 'High Index Polycarbonate 1.67',
          priceRange: '₹799 - ₹1,999',
          description: 'Blocks harmful blue light emitted from mobiles, laptops, and LED screens to reduce eye fatigue & dryness.',
          imageUrl: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=600&auto=format&fit=crop',
          isTrending: true,
        },
      ]);
    }

    return { success: true, message: 'Initial hospital seed data created successfully.' };
  }
}
