import { connectDB } from '../Database/mongoose.js';
import Doctor from '../Models/Doctor.js';
import { cache } from '../Database/redis.js';
import { logger } from '../Logger/pino.js';

export class DoctorService {
  static async listDoctors() {
    const cacheKey = 'doctors:active_list';
    
    // Check Cache-Aside
    const cachedDoctors = await cache.get(cacheKey);
    if (cachedDoctors) {
      logger.info('Serving active doctors from Redis cache');
      return cachedDoctors;
    }

    try {
      await connectDB();
      const doctors = await Doctor.find({ isAvailable: true }).sort({ createdAt: -1 }).lean();
      const result = doctors || [];

      await cache.set(cacheKey, result, 600); // 10 minute cache TTL
      return result;
    } catch (err) {
      logger.error({ error: err.message }, 'MongoDB error fetching doctors');
      return [];
    }
  }

  static async getDoctorById(id) {
    try {
      await connectDB();
      return await Doctor.findById(id).lean();
    } catch (err) {
      logger.error({ error: err.message }, 'Error fetching doctor by id');
      return null;
    }
  }
}
