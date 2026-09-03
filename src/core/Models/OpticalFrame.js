import mongoose from 'mongoose';

const OpticalFrameSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, default: 'RS Eye Care Signature' },
    category: { type: String, enum: ['FRAMES', 'POWER_LENSES', 'SUNGLASSES', 'KIDS_GLASSES'], default: 'FRAMES' },
    lensType: { type: String, default: 'Anti-Glare Blue Cut Lens Compatible' },
    frameShape: { type: String, default: 'Rectangle / Oval' },
    material: { type: String, default: 'TR90 Lightweight Flexible Acetate' },
    priceRange: { type: String, default: '₹999 - ₹2,999' },
    description: { type: String, required: true },
    imageUrl: { type: String, default: '/images/frame-placeholder.jpg' },
    isTrending: { type: Boolean, default: false },
  },
  { timestamps: true }
);

OpticalFrameSchema.index({ name: 'text', category: 1 });

export default mongoose.models.OpticalFrame || mongoose.model('OpticalFrame', OpticalFrameSchema);
