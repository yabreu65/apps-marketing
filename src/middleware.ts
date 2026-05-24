import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const INTERNAL_AUTH_COOKIE_NAME =
  process.env.INTERNAL_AUTH_COOKIE_NAME?.trim() || 'apps_marketing_internal_auth';

function isTokenShapeValid(token: string | undefined) {
  if (!token) return false;
  const [prefix, expiresRaw] = token.split('.');
  if (prefix !== 'v1' || !expiresRaw) return false;

  const expiresAt = Number(expiresRaw);
  if (!Number.isFinite(expiresAt)) return false;
  return expiresAt > Date.now();
}

function isValidInternalRedirect(value: string | null | undefined) {
  if (!value) return false;
  if (!value.startsWith('/internal')) return false;
  if (value.startsWith('//')) return false;
  return true;
}

function normalizeInternalRedirect(value: string | null | undefined): string {
  return isValidInternalRedirect(value) && value ? value : '/internal/leads';
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const cookie = request.cookies.get(INTERNAL_AUTH_COOKIE_NAME)?.value;
  const isAuthed = isTokenShapeValid(cookie);

  if (!pathname.startsWith('/internal')) {
    return NextResponse.next();
  }

  if (pathname === '/internal/login') {
    if (!isAuthed) return NextResponse.next();

    const redirectParam = request.nextUrl.searchParams.get('redirect');
    const target = normalizeInternalRedirect(redirectParam);
    return NextResponse.redirect(new URL(target, request.url));
  }

  if (isAuthed) {
    return NextResponse.next();
  }

  const loginUrl = new URL('/internal/login', request.url);
  loginUrl.searchParams.set('redirect', normalizeInternalRedirect(`${pathname}${search}`));
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/internal/:path*'],
};
