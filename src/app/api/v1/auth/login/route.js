import { AuthService } from '@/core/Services/AuthService.js';
import { sanitizeNoSQL } from '@/core/Http/Middleware/security.js';

export async function POST(request) {
  try {
    const rawBody = await request.json();
    const body = sanitizeNoSQL(rawBody);

    if (!body.email || !body.password) {
      return Response.json(
        { success: false, message: 'Email and password are required', error: 'VALIDATION_ERROR' },
        { status: 400 }
      );
    }

    const authResult = await AuthService.login(body.email, body.password);

    return Response.json(
      {
        success: true,
        message: 'Authentication successful',
        data: authResult,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: error.message || 'Authentication failed', error: 'UNAUTHORIZED' },
      { status: 401 }
    );
  }
}
