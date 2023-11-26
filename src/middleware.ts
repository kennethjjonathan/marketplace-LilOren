import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import roleFetcher from './lib/roleFetcher';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const cookieList = cookies();
  if (
    request.nextUrl.pathname.startsWith('/signin') ||
    request.nextUrl.pathname.startsWith('/register')
  ) {
    if (cookieList.has('refresh_token')) {
      const role = await roleFetcher(cookieList.toString());
      if (role !== 'unauthorized') {
        return NextResponse.redirect(new URL('/', request.url));
      }
    }
  }
  if (
    request.nextUrl.pathname.startsWith('/user') ||
    request.nextUrl.pathname.startsWith('/wallet')
  ) {
    if (!cookieList.has('refresh_token')) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }
    const role = await roleFetcher(cookieList.toString());
    if (role === 'unauthorized') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith('/seller')) {
    if (!cookieList.has('refresh_token')) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }
    const role = await roleFetcher(cookieList.toString());
    if (role !== 'seller') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
}
