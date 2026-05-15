export function internalNoStoreHeaders() {
  return {
    'Cache-Control': 'no-store, no-cache, must-revalidate',
    Pragma: 'no-cache',
  } as const;
}

function buildRequestOrigin(request: Request) {
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host');
  if (!host) return null;

  const proto = request.headers.get('x-forwarded-proto') ?? 'http';
  return `${proto}://${host}`;
}

function normalizeOrigin(value: string | null) {
  if (!value) return null;

  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

export function isSameOriginRequest(request: Request) {
  const expectedOrigin = normalizeOrigin(buildRequestOrigin(request));
  if (!expectedOrigin) return false;

  const originHeader = normalizeOrigin(request.headers.get('origin'));
  if (originHeader) {
    return originHeader === expectedOrigin;
  }

  const refererHeader = request.headers.get('referer');
  if (refererHeader) {
    const refererOrigin = normalizeOrigin(refererHeader);
    return refererOrigin === expectedOrigin;
  }

  return process.env.NODE_ENV !== 'production';
}
