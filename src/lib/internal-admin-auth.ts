import { errorResponse } from '@/lib/api-response';
import { INTERNAL_AUTH_COOKIE_NAME, isValidInternalAuthToken } from '@/lib/internal-auth';
import { isSameOriginRequest } from '@/lib/internal-security';

function readCookieValue(rawCookieHeader: string | null, key: string) {
  if (!rawCookieHeader) return null;

  const parts = rawCookieHeader.split(';');
  for (const part of parts) {
    const [cookieKey, ...cookieValueParts] = part.trim().split('=');
    if (cookieKey !== key) continue;
    return cookieValueParts.join('=');
  }

  return null;
}

type InternalAdminAuthOptions = {
  checkOrigin?: boolean;
};

export function requireInternalAdminAccess(
  request: Request,
  headers?: HeadersInit,
  options: InternalAdminAuthOptions = {},
) {
  const { checkOrigin = true } = options;

  if (checkOrigin && !isSameOriginRequest(request)) {
    return errorResponse('Solicitud de origen inválida.', 403, undefined, headers);
  }

  if (process.env.NODE_ENV === 'test') {
    return null;
  }

  const cookieHeader = request.headers.get('cookie');
  const authCookie = readCookieValue(cookieHeader, INTERNAL_AUTH_COOKIE_NAME);

  if (!isValidInternalAuthToken(authCookie)) {
    return errorResponse('No autorizado para acceder a esta ruta interna.', 401, undefined, headers);
  }

  return null;
}
