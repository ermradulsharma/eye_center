import { connectDB } from '../Database/mongoose.js';
import EyeTreatment from '../Models/EyeTreatment.js';
import OpticalFrame from '../Models/OpticalFrame.js';
import { cache } from '../Database/redis.js';
import { logger } from '../Logger/pino.js';
import { DUMMY_PRODUCTS } from './SeedService.js';

export class TreatmentService {
  static async listTreatments() {
    const cacheKey = 'treatments:list';
    const cached = await cache.get(cacheKey);
    if (cached) return cached;

    try {
      await connectDB();
      const list = await EyeTreatment.find().sort({ createdAt: 1 }).lean();
      const result = list || [];
      await cache.set(cacheKey, result, 600);
      return result;
    } catch (err) {
      logger.error({ error: err.message }, 'MongoDB error fetching treatments');
      return [];
    }
  }

  static async listOpticalFrames() {
    const cacheKey = 'optical:frames';
    const cached = await cache.get(cacheKey);
    if (cached && cached.length > 0) return cached;

    try {
      await connectDB();
      let frames = await OpticalFrame.find().sort({ createdAt: -1 }).lean();
      
      // Auto-populate 10 dummy products if database is empty
      if (!frames || frames.length === 0) {
        await OpticalFrame.insertMany(DUMMY_PRODUCTS);
        frames = await OpticalFrame.find().sort({ createdAt: -1 }).lean();
      }

      const result = frames || DUMMY_PRODUCTS;
      await cache.set(cacheKey, result, 300);
      return result;
    } catch (err) {
      logger.error({ error: err.message }, 'MongoDB error fetching optical frames');
      return DUMMY_PRODUCTS;
    }
  }

  static async invalidateCache() {
    await cache.del('treatments:list');
    await cache.del('optical:frames');
  }
}
