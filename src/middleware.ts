import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import {
  getInternalAuthCookieValue,
  INTERNAL_AUTH_COOKIE_NAME,
  normalizeInternalRedirect,
} from '@/lib/internal-auth';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const cookie = request.cookies.get(INTERNAL_AUTH_COOKIE_NAME)?.value;
  const isAuthed = cookie === getInternalAuthCookieValue();

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
