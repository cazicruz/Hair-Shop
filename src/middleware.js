// middleware.ts (in root directory)
import { NextResponse } from 'next/server';

const EXTERNAL_API_URL = process.env.API_URL || 'https://your-api.com';

export async function middleware(request) {
  const token = request.cookies.get('accessToken')?.value;
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ['/','/login', '/register', '/forgot-password'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // If accessing a public route, allow access
  if (isPublicRoute) {
    // If already authenticated and trying to access login, redirect to products
    if (token && pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/products', request.url));
    }
    return NextResponse.next();
  }

  // For protected routes, verify authentication
  if (!token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  // Optional: Verify token with external server
  // This adds an extra request but ensures token validity
  try {
    const response = await fetch(`${EXTERNAL_API_URL}/auth/verify`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const url = new URL('/login', request.url);
      url.searchParams.set('redirect', pathname);
      const res = NextResponse.redirect(url);
      res.cookies.delete('auth_token');
      return res;
    }
  } catch (error) {
    console.error('Token verification failed:', error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};