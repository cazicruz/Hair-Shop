'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import LoadingScreen2 from '@/components/LoadingScreen';

const PUBLIC_ROUTES = ['/about','/faq','/terms','/privacy-policy','/contact','/products','/cart','/login', '/register','/forgotPassword', '/forgot-password', '/resetPassword'];
// const AUTH_ROUTES = ['/login', '/register', '/forgot-password', '/reset-password'];

export default function AuthProvider({ children }) {
    const { user, isLoading, refreshToken } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        // Skip auth check for public routes
        const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route));
        // const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));
        
        if (isLoading) {
            return;
        }

        // If user is on a public route and is authenticated, redirect to products
        // if (isPublicRoute && user) {
        //     router.push('/products');
        //     return;
        // }

        // If user is not authenticated and not on a public route, redirect to login
        if (!(isPublicRoute || pathname === '/') && !user) {
            router.push(`/login?redirect=${pathname}`);
            return;
        }
    }, [user, isLoading, pathname, router]);

    // Auto-refresh token every 10 minutes
    useEffect(() => {
        if (!user) return;

        const interval = setInterval(() => {
            refreshToken().catch(() => {
                // Token refresh failed, user will be logged out by the axios interceptor
            });
        }, 10 * 60 * 1000); // 10 minutes

        return () => clearInterval(interval);
    }, [user, refreshToken]);

    // Show loading state
    if (isLoading) {
        return (
            <LoadingScreen2>
                wellcome
            </LoadingScreen2>
        );
    }

    return <>{children}</>;
}