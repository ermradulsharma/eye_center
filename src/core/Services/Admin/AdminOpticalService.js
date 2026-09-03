import { connectDB } from '../../Database/mongoose.js';
import OpticalFrame from '../../Models/OpticalFrame.js';

export class AdminOpticalService {
  static async listAllFrames() {
    try {
      await connectDB();
      return await OpticalFrame.find().sort({ createdAt: -1 }).lean();
    } catch (err) {
      return [];
    }
  }

  static async createFrame(data) {
    await connectDB();
    const frame = await OpticalFrame.create({
      name: data.name,
      brand: data.brand || 'RS Eye Care Signature',
      category: data.category || 'FRAMES',
      lensType: data.lensType || 'Blue Cut Digital Anti-Glare',
      frameShape: data.frameShape || 'Rectangle / Oval',
      material: data.material || 'TR90 Lightweight Acetate',
      priceRange: data.priceRange || '₹999 - ₹2,499',
      description: data.description || 'Premium optical frame with high durability.',
      imageUrl: data.imageUrl || 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600',
      isTrending: Boolean(data.isTrending),
    });
    return frame.toObject();
  }

  static async updateFrame(id, data) {
    await connectDB();
    const updated = await OpticalFrame.findByIdAndUpdate(id, data, { new: true }).lean();
    return updated;
  }

  static async deleteFrame(id) {
    await connectDB();
    await OpticalFrame.findByIdAndDelete(id);
    return { success: true, message: 'Frame deleted successfully' };
  }
}
