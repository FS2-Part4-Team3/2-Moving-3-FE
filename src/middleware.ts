import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuthIsLoggedIn } from './api/UserService';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('local-access-token');
  const loggedInUser = token ? await getAuthIsLoggedIn(token.value) : null;

  const url = req.nextUrl.clone();

  if (
    req.nextUrl.pathname === '/normal/sign-in' ||
    req.nextUrl.pathname === '/normal/sign-up' ||
    req.nextUrl.pathname === '/driver/sign-in' ||
    req.nextUrl.pathname === '/driver/sign-up'
  ) {
    if (loggedInUser) {
      url.pathname = loggedInUser.userType === 'driver' ? '/driver/receive-quote' : '/normal/match-driver';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (req.nextUrl.pathname.startsWith('/driver')) {
    if (!loggedInUser) {
      url.pathname = '/normal/sign-in';
      return NextResponse.redirect(url);
    } else if (loggedInUser.userType === 'user') {
      url.pathname = '/normal/match-driver';
      return NextResponse.redirect(url);
    }
  } else if (req.nextUrl.pathname.startsWith('/normal')) {
    if (!loggedInUser) {
      url.pathname = '/normal/sign-in';
      return NextResponse.redirect(url);
    } else if (loggedInUser.userType === 'driver') {
      url.pathname = '/driver/receive-quote';
      return NextResponse.redirect(url);
    }
  } else if (req.nextUrl.pathname.startsWith('/match-driver')) {
    if (loggedInUser) {
      if (loggedInUser.userType === 'user') {
        url.pathname = '/normal/match-driver';
        return NextResponse.redirect(url);
      } else if (loggedInUser.userType === 'driver') {
        url.pathname = '/driver/receive-quote';
        return NextResponse.redirect(url);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/driver/:path*', '/normal/:path*', '/match-driver/:path*'],
};
