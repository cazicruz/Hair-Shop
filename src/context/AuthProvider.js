'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import LoadingScreen2 from '@/components/LoadingScreen';

const PUBLIC_ROUTES = ['/login', '/register', '/forgot-password', '/reset-password'];

export default function AuthProvider({ children }) {
    const { user, isLoading, refreshToken } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        // Skip auth check for public routes
        const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route));
        
        if (isLoading) {
            return;
        }

        // If user is on a public route and is authenticated, redirect to dashboard
        if (isPublicRoute && user) {
            router.push('/dashboard');
            return;
        }

        // If user is not authenticated and not on a public route, redirect to login
        if (!isPublicRoute && !user) {
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
                console.log('Token refresh failed');
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