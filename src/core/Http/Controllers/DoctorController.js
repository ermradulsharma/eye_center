import { DoctorService } from '../../Services/DoctorService.js';

export class DoctorController {
  static async getDoctors() {
    try {
      const doctors = await DoctorService.listDoctors();
      return Response.json({ success: true, data: doctors });
    } catch (error) {
      return Response.json({ success: false, message: error.message, error: 'SERVER_ERROR' }, { status: 500 });
    }
  }
}
