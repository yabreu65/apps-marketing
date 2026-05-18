import { isSameOriginRequest } from '@/lib/internal-security';

function normalizeOrigin(value: string | null) {
  if (!value) return null;

  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

function getAllowedOriginsFromEnv() {
  const raw = process.env.PUBLIC_API_ALLOWED_ORIGINS?.trim();
  if (!raw) return [];

  return raw
    .split(',')
    .map((origin) => normalizeOrigin(origin.trim()))
    .filter((origin): origin is string => Boolean(origin));
}

export function isAllowedPublicApiRequest(request: Request) {
  const allowedOrigins = getAllowedOriginsFromEnv();

  if (allowedOrigins.length === 0) {
    return isSameOriginRequest(request);
  }

  const origin = normalizeOrigin(request.headers.get('origin'));
  if (origin) {
    return allowedOrigins.includes(origin);
  }

  const referer = normalizeOrigin(request.headers.get('referer'));
  if (referer) {
    return allowedOrigins.includes(referer);
  }

  return process.env.NODE_ENV !== 'production';
}
