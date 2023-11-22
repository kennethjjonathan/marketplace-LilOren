import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const cookieList = cookies();
  if (
    request.nextUrl.pathname.startsWith('/signin') ||
    request.nextUrl.pathname.startsWith('/register')
  ) {
    if (cookieList.has('refresh_token')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith('/user')) {
    if (!cookieList.has('refresh_token')) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  }

  // try {
  //   const response = await fetch(`${CONSTANTS.BASEURL}/auth/user`, {
  //     headers: { Cookie: cookies().toString() },
  //   });
  //   const data = await response.json();
  //   console.log(data);
  //   if (response.ok) {
  //     return NextResponse.redirect(new URL('/', request.url));
  //   }
  // } catch (error: any) {
  //   console.log(error);
  // }
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/about/:path*',
// };
