import { connectDB } from '../Database/mongoose.js';
import EyeTreatment from '../Models/EyeTreatment.js';
import OpticalFrame from '../Models/OpticalFrame.js';

const FALLBACK_TREATMENTS = [
  {
    _id: 'tr-1',
    title: 'Micro-Incision Cataract Surgery (MICS)',
    slug: 'mics-cataract-surgery',
    category: 'CATARACT',
    shortDescription: 'Blade-free, stitchless cataract removal with imported premium Foldable Intraocular Lenses (IOL).',
    fullDescription: 'Advanced Phacoemulsification technique providing same-day recovery, zero hospital stay, and crystal-clear vision.',
    benefits: ['No Injection, No Stitch, No Bandage', 'Quick 15-Minute Procedure', 'Same Day Discharge'],
    iconName: 'Eye',
    isFeatured: true,
  },
  {
    _id: 'tr-2',
    title: 'LASIK & Contoura Vision Refractive Surgery',
    slug: 'lasik-contoura-vision',
    category: 'LASIK_REFRACTIVE',
    shortDescription: 'Permanent freedom from spectacles and contact lenses with high-precision laser correction.',
    fullDescription: 'Customized topography-guided laser vision correction tailored to your unique corneal curvature.',
    benefits: ['100% Painless Laser Technique', 'HD Vision Clarity', 'FDA Approved Technology'],
    iconName: 'Sparkles',
    isFeatured: true,
  },
];

const FALLBACK_OPTICAL = [
  {
    _id: 'frame-1',
    name: 'RS Titanium UltraLite Air Frame',
    brand: 'RS Signature Premium',
    category: 'FRAMES',
    lensType: 'Blue Cut Digital Anti-Glare Lens',
    frameShape: 'Rectangle / Sleek Rimless',
    material: 'Pure Japanese Titanium (Featherweight 8g)',
    priceRange: '₹1,499 - ₹3,499',
    description: 'Ultra-lightweight titanium frame designed for all-day computer screen work and ear comfort.',
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop',
    isTrending: true,
  },
  {
    _id: 'frame-2',
    name: 'RS Flexi-Shield Prescription Frame',
    brand: 'RS Ergonomic Optical',
    category: 'FRAMES',
    lensType: 'Progressive HD Multi-Focal Lens Compatible',
    frameShape: 'Classic Wayfarer / Oval',
    material: 'Flexible Italian Acetate',
    priceRange: '₹999 - ₹2,499',
    description: 'Durable flex-hinge frame ideal for active daily use, reading, and multifocal lenses.',
    imageUrl: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=600&auto=format&fit=crop',
    isTrending: true,
  },
];

export class TreatmentService {
  static async listTreatments() {
    try {
      await connectDB();
      const list = await EyeTreatment.find().sort({ createdAt: 1 }).lean();
      if (list && list.length > 0) return list;
      return FALLBACK_TREATMENTS;
    } catch (err) {
      return FALLBACK_TREATMENTS;
    }
  }

  static async listOpticalFrames() {
    try {
      await connectDB();
      const frames = await OpticalFrame.find().sort({ createdAt: -1 }).lean();
      if (frames && frames.length > 0) return frames;
      return FALLBACK_OPTICAL;
    } catch (err) {
      return FALLBACK_OPTICAL;
    }
  }
}
