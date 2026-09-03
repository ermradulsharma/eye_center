import { AdminOpticalService } from '../../../Services/Admin/AdminOpticalService.js';
import { TreatmentService } from '../../../Services/TreatmentService.js';
import { authenticateRole } from '../../Middleware/auth.js';
import { sanitizeNoSQL, opticalFrameSchema } from '../../Middleware/security.js';
import { logger } from '../../../Logger/pino.js';

export class AdminOpticalController {
  static async getFrames(req) {
    try {
      const auth = authenticateRole(req, ['ADMIN']);
      if (!auth.authenticated) return auth.errorResponse;

      const frames = await AdminOpticalService.listAllFrames();
      return Response.json({
        success: true,
        data: frames,
        meta: {
          pagination: {
            page: 1,
            limit: frames.length,
            total: frames.length,
          },
        },
      });
    } catch (err) {
      logger.error({ error: err.message }, 'Admin error fetching optical frames');
      return Response.json({ success: false, message: err.message, error: 'SERVER_ERROR' }, { status: 500 });
    }
  }

  static async createFrame(req) {
    try {
      const auth = authenticateRole(req, ['ADMIN']);
      if (!auth.authenticated) return auth.errorResponse;

      const rawBody = await req.json();
      const body = sanitizeNoSQL(rawBody);

      const validation = opticalFrameSchema.safeParse(body);
      if (!validation.success) {
        return Response.json(
          { success: false, message: 'Validation Error: Check frame input fields.', error: 'VALIDATION_ERROR', details: validation.error.format() },
          { status: 400 }
        );
      }

      const newFrame = await AdminOpticalService.createFrame(validation.data);
      await TreatmentService.invalidateCache();
      logger.info({ frameId: newFrame._id, name: newFrame.name }, 'Admin created new optical frame');

      return Response.json({ success: true, message: 'New Frame added to store!', data: newFrame }, { status: 201 });
    } catch (err) {
      logger.error({ error: err.message }, 'Admin error creating optical frame');
      return Response.json({ success: false, message: err.message, error: 'SERVER_ERROR' }, { status: 500 });
    }
  }

  static async updateFrame(req) {
    try {
      const auth = authenticateRole(req, ['ADMIN']);
      if (!auth.authenticated) return auth.errorResponse;

      const { searchParams } = new URL(req.url);
      const rawId = searchParams.get('id');
      const id = sanitizeNoSQL(rawId);

      const rawBody = await req.json();
      const body = sanitizeNoSQL(rawBody);

      const updated = await AdminOpticalService.updateFrame(id, body);
      await TreatmentService.invalidateCache();
      logger.info({ frameId: id }, 'Admin updated optical frame');

      return Response.json({ success: true, message: 'Frame updated successfully', data: updated });
    } catch (err) {
      logger.error({ error: err.message }, 'Admin error updating optical frame');
      return Response.json({ success: false, message: err.message, error: 'SERVER_ERROR' }, { status: 500 });
    }
  }

  static async deleteFrame(req) {
    try {
      const auth = authenticateRole(req, ['ADMIN']);
      if (!auth.authenticated) return auth.errorResponse;

      const { searchParams } = new URL(req.url);
      const rawId = searchParams.get('id');
      const id = sanitizeNoSQL(rawId);

      await AdminOpticalService.deleteFrame(id);
      await TreatmentService.invalidateCache();
      logger.info({ frameId: id }, 'Admin deleted optical frame');

      return Response.json({ success: true, message: 'Frame deleted successfully' });
    } catch (err) {
      logger.error({ error: err.message }, 'Admin error deleting optical frame');
      return Response.json({ success: false, message: err.message, error: 'SERVER_ERROR' }, { status: 500 });
    }
  }
}
