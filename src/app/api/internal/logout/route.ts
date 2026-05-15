import { cookies } from 'next/headers';

import { methodNotAllowedResponse, successResponse } from '@/lib/api-response';
import { INTERNAL_AUTH_COOKIE_NAME } from '@/lib/internal-auth';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set(INTERNAL_AUTH_COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: new Date(0),
  });

  return successResponse({ message: 'Sesión interna cerrada.' });
}

export async function GET() {
  return methodNotAllowedResponse(['POST']);
}
