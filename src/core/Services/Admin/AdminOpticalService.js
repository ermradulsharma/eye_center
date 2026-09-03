import { connectDB } from '../../Database/mongoose.js';
import OpticalFrame from '../../Models/OpticalFrame.js';
import { DUMMY_PRODUCTS } from '../SeedService.js';

export class AdminOpticalService {
  static async listAllFrames() {
    try {
      await connectDB();
      let frames = await OpticalFrame.find().sort({ createdAt: -1 }).lean();
      
      if (!frames || frames.length === 0) {
        await OpticalFrame.insertMany(DUMMY_PRODUCTS);
        frames = await OpticalFrame.find().sort({ createdAt: -1 }).lean();
      }

      return frames || DUMMY_PRODUCTS;
    } catch (err) {
      return DUMMY_PRODUCTS;
    }
  }

  static async createFrame(data) {
    await connectDB();
    const frame = await OpticalFrame.create({
      name: data.name,
      brand: data.brand || 'RS Signature Premium',
      category: data.category || 'FRAMES',
      lensType: data.lensType || 'Blue Cut Digital Anti-Glare',
      frameShape: data.frameShape || 'Rectangle / Oval',
      material: data.material || 'TR90 Acetate',
      priceRange: data.priceRange || '₹1,499 - ₹2,999',
      description: data.description || 'Precision prescription optical frame.',
      imageUrl: data.imageUrl || '/images/eye_center_banner.jpg',
      isTrending: Boolean(data.isTrending),
    });
    return frame.toObject();
  }

  static async updateFrame(id, data) {
    await connectDB();
    return await OpticalFrame.findByIdAndUpdate(id, data, { new: true }).lean();
  }

  static async deleteFrame(id) {
    await connectDB();
    await OpticalFrame.findByIdAndDelete(id);
    return { success: true, message: 'Frame deleted successfully' };
  }
}
