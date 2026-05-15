import { cookies } from 'next/headers';

import { errorResponse, methodNotAllowedResponse, successResponse } from '@/lib/api-response';
import {
  getInternalAuthCookieValue,
  INTERNAL_AUTH_COOKIE_NAME,
  isValidInternalDashboardPassword,
} from '@/lib/internal-auth';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { password?: unknown };
    const password = typeof body.password === 'string' ? body.password : '';

    if (!isValidInternalDashboardPassword(password)) {
      return errorResponse('Contraseña inválida.', 401);
    }

    const cookieStore = await cookies();
    cookieStore.set(INTERNAL_AUTH_COOKIE_NAME, getInternalAuthCookieValue(), {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 8,
    });

    return successResponse({ message: 'Acceso interno habilitado.' });
  } catch {
    return errorResponse('No se pudo procesar el login interno.', 500);
  }
}

export async function GET() {
  return methodNotAllowedResponse(['POST']);
}
