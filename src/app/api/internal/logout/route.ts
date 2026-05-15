import { cookies } from 'next/headers';

import { errorResponse, methodNotAllowedResponse, successResponse } from '@/lib/api-response';
import { INTERNAL_AUTH_COOKIE_NAME } from '@/lib/internal-auth';
import { internalNoStoreHeaders, isSameOriginRequest } from '@/lib/internal-security';

export async function POST(request: Request) {
  const headers = internalNoStoreHeaders();

  try {
    if (!isSameOriginRequest(request)) {
      return errorResponse('Solicitud de origen inválida.', 403, undefined, headers);
    }

    const cookieStore = await cookies();
    cookieStore.set(INTERNAL_AUTH_COOKIE_NAME, '', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      expires: new Date(0),
    });

    return successResponse({ message: 'Sesión interna cerrada.' }, 200, headers);
  } catch {
    return errorResponse('No se pudo cerrar la sesión interna.', 500, undefined, headers);
  }
}

export async function GET() {
  return methodNotAllowedResponse(['POST'], internalNoStoreHeaders());
}
