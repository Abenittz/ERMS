import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  const role = request.cookies.get('userRole')?.value; // 'admin', 'technician', 'user'

  const pathname = request.nextUrl.pathname;

  const publicPaths = ['/login', '/register', '/api', '/_next', '/favicon.ico'];

  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

  // Unauthenticated user trying to access protected routes
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect based on role if trying to access root "/"
  if (pathname === '/') {
    if (role === 'admin') {
      return NextResponse.redirect(new URL('/admin', request.url));
    } else if (role === 'technician') {
      return NextResponse.redirect(new URL('/technician', request.url));
    }
    // else allow user
  }

  // Role-based route protection
  if (pathname.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (pathname.startsWith('/technician') && role !== 'technician') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (pathname.startsWith('/user') && role !== 'user') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/admin/:path*',
    '/technician/:path*',
    '/user/:path*',
    '/dashboard/:path*',
    '/profile/:path*',
  ],
};
