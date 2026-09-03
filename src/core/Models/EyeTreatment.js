import mongoose from 'mongoose';

const EyeTreatmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    category: {
      type: String,
      required: true,
      enum: ['CATARACT', 'LASIK_REFRACTIVE', 'GLAUCOMA', 'CORNEA', 'PEDIATRIC', 'VISION_REHAB'],
    },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    benefits: [{ type: String }],
    iconName: { type: String, default: 'Eye' },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

EyeTreatmentSchema.index({ title: 'text', category: 1 });

export default mongoose.models.EyeTreatment || mongoose.model('EyeTreatment', EyeTreatmentSchema);
