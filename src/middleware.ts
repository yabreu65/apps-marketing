import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getInternalAuthCookieValue, INTERNAL_AUTH_COOKIE_NAME } from '@/lib/internal-auth';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (!pathname.startsWith('/internal')) {
    return NextResponse.next();
  }

  if (pathname === '/internal/login') {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(INTERNAL_AUTH_COOKIE_NAME)?.value;

  if (cookie === getInternalAuthCookieValue()) {
    return NextResponse.next();
  }

  const loginUrl = new URL('/internal/login', request.url);
  const redirectParam = `${pathname}${search}`;
  loginUrl.searchParams.set('redirect', redirectParam);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/internal/:path*'],
};
