// middleware.ts
import { NextResponse } from 'next/server';

const EXTERNAL_API_URL = process.env.API_URL || 'http://localhost:8000/api';

export async function middleware(request) {
  const token = request.cookies.get('accessToken')?.value;
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ['/products','/cart','/login', '/register', '/forgotPassword', '/reset-password'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // If accessing a public route
  // Debug: log token and pathname so we can tell if middleware thinks this is public
  try {
    // Logs from middleware show up in the dev server console
    console.log('[middleware] pathname=', pathname, 'isPublicRoute=', isPublicRoute, 'tokenPresent=', !!token);
  } catch (e) {}

  if (isPublicRoute || pathname === '/') {
    // Redirect authenticated users away from auth pages
    if (token && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
      return NextResponse.redirect(new URL('/products', request.url));
    }
    return NextResponse.next();
  }

  // For protected routes, check if token exists
  if (!token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  // Optional: Verify token with backend (recommended only for sensitive routes)
  // Comment out if you want to skip verification for better performance
  if (pathname.startsWith('/admin') || pathname.startsWith('/checkout')) {
    try {
      const response = await fetch(`${EXTERNAL_API_URL}auth/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const url = new URL('/login', request.url);
        url.searchParams.set('redirect', pathname);
        url.searchParams.set('error', 'session_expired');
        
        const res = NextResponse.redirect(url);
        // ✅ Delete correct cookies
        res.cookies.delete('accessToken');
        res.cookies.delete('user');
        return res;
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      // On network error, allow access (fail open)
      // Or redirect to login (fail closed) - uncomment below:
      // const url = new URL('/login', request.url);
      // return NextResponse.redirect(url);
    }
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
     * - public assets
     * - API routes (if you want to exclude them)
     */
    '/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};