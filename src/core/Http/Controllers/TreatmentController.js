import { TreatmentService } from '../../Services/TreatmentService.js';

export class TreatmentController {
  static async getTreatments() {
    try {
      const treatments = await TreatmentService.listTreatments();
      const frames = await TreatmentService.listOpticalFrames();
      return Response.json({
        success: true,
        data: {
          treatments,
          opticalFrames: frames,
        },
      });
    } catch (error) {
      return Response.json({ success: false, message: error.message, error: 'SERVER_ERROR' }, { status: 500 });
    }
  }
}
