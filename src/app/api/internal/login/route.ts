import { cookies } from 'next/headers';

import { errorResponse, methodNotAllowedResponse, successResponse } from '@/lib/api-response';
import {
  getInternalAuthCookieValue,
  INTERNAL_AUTH_COOKIE_NAME,
  isInternalAuthConfigured,
  isValidInternalDashboardPassword,
  normalizeInternalRedirect,
} from '@/lib/internal-auth';
import { internalNoStoreHeaders, isSameOriginRequest } from '@/lib/internal-security';
import {
  clearLoginAttempts,
  getLoginRateLimitKey,
  getRemainingBlockSeconds,
  isLoginBlocked,
  recordFailedLoginAttempt,
} from '@/lib/login-rate-limit';

export async function POST(request: Request) {
  const rateLimitKey = getLoginRateLimitKey(request);
  const headers = internalNoStoreHeaders();

  try {
    if (!isSameOriginRequest(request)) {
      return errorResponse('Solicitud de origen inválida.', 403, undefined, headers);
    }

    if (isLoginBlocked(rateLimitKey)) {
      const retryAfterSeconds = getRemainingBlockSeconds(rateLimitKey);
      return errorResponse(
        'Demasiados intentos. Esperá unos minutos antes de volver a intentar.',
        429,
        {
          retryAfterSeconds,
        },
        headers,
      );
    }

    if (!isInternalAuthConfigured()) {
      return errorResponse('La autenticación interna no está configurada correctamente.', 503, undefined, headers);
    }

    const body = (await request.json()) as { password?: unknown; redirect?: unknown };
    const password = typeof body.password === 'string' ? body.password : '';
    const redirect = typeof body.redirect === 'string' ? body.redirect : null;

    if (!isValidInternalDashboardPassword(password)) {
      recordFailedLoginAttempt(rateLimitKey);
      return errorResponse('Credenciales inválidas.', 401, undefined, headers);
    }

    clearLoginAttempts(rateLimitKey);

    const cookieStore = await cookies();
    cookieStore.set(INTERNAL_AUTH_COOKIE_NAME, getInternalAuthCookieValue(), {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 8,
    });

    return successResponse({ message: 'Acceso interno habilitado.', redirectTo: normalizeInternalRedirect(redirect) }, 200, headers);
  } catch {
    return errorResponse('No se pudo procesar el login interno.', 500, undefined, headers);
  }
}

export async function GET() {
  return methodNotAllowedResponse(['POST'], internalNoStoreHeaders());
}
