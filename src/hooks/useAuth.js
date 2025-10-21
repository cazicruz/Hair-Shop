'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosClient from '@/lib/axiosClient';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';


const useAuth = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const searchParams = useSearchParams();


    // Fetch current user - this will run on mount and cache the user
    const { data: user, isLoading, error } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const userCookie = Cookies.get('user');
            const accessToken = Cookies.get('accessToken');
            
            if (!accessToken) {
                return null;
            }
            
            // If we have a cookie, return it immediately
            if (userCookie) {
                try {
                    return JSON.parse(userCookie);
                } catch {
                    return null;
                }
            }
            
            // Otherwise fetch from server to  token
            try {
                const response = await axiosClient.get('/auth/profile');
                const userData = response.data.user || response.data;
                Cookies.set('user', JSON.stringify(userData), { 
                    secure: true, 
                    sameSite: 'strict' 
                });
                return userData;
            } catch {
                return null;
            }
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: false,
    });

    // Login mutation
    const loginMutation = useMutation({
        mutationFn: async (credentials) => {
            try {
                const response = await axiosClient.post('/auth/login', credentials);
                const { token: accessToken, user: userObj } = response.data.data;

                Cookies.set('accessToken', accessToken, { 
                    secure: true, 
                    sameSite: 'strict',
                    expires: 2 // 2 days
                });

                Cookies.set('user', JSON.stringify(userObj), { 
                    secure: true, 
                    sameSite: 'strict',
                    expires: 7
                });

                return userObj;
            } catch (err) {
                // Normalize axios error to propagate a sensible message to callers
                const message = err?.response?.data?.message || err?.message || 'Login failed';
                const normalizedError = new Error(message);
                normalizedError.status = err?.response?.status;
                throw normalizedError;
            }
        },
        onSuccess: (userData) => {
            // Update the user query cache
            queryClient.setQueryData(['user'], userData);
            toast.success('Login Successfull', { className: 'toast-success' });
            const redirect = searchParams.get('redirect');
            router.push(redirect || '/products');
        },
        onError: (error) => {
            const message = error?.message || 'Error logging in';
            // toast.error(message, { className: 'toast-error' });
        }
    });

    // Register mutation
    const registerMutation = useMutation({
        mutationFn: async (userData) => {
            const response = await axiosClient.post('/auth/register', userData);
            const { token: accessToken, user: userObj } = response.data;
            
            // refreshToken is set as httpOnly cookie by the server
            
            Cookies.set('accessToken', accessToken, { 
                secure: true, 
                sameSite: 'strict',
                expires: 7
            });
            
            Cookies.set('user', JSON.stringify(userObj), { 
                secure: true, 
                sameSite: 'strict',
                expires: 7
            });
            
            return userObj;
        },
        onSuccess: (userData) => {
            queryClient.setQueryData(['user'], userData);
            toast.success(`welcome ${userData.name}`, { className: 'toast-success' });
            router.push('/products');
        }
    });

    // Forgot password mutation
    const forgotPasswordMutation = useMutation({
        mutationFn: async (email) => {
            const response = await axiosClient.post('/auth/forgot-password', { email });
            Cookies.set('userEmail', email, { 
                secure: true, 
                sameSite: 'strict',
                expires: 1 // 1 day
            });
            return response.data;

        }
    });

    // Reset password mutation
    const resetPasswordMutation = useMutation({
        mutationFn: async ({ token, newPassword }) => {
            const email = Cookies.get('userEmail');
            const response = await axiosClient.post('/auth/reset-password', { 
                token, 
                newPassword,
                email
            });
            return response.data;
        },
        onSuccess: () => {
            Cookies.remove('userEmail');
            toast.success('Password Reset Successfull', { className: 'toast-success' });
            router.push('/login');
        }
    });

    // Refresh token mutation
    const refreshTokenMutation = useMutation({
        mutationFn: async () => {
            console.log('Refreshing token...');
            // The httpOnly refreshToken cookie will be sent automatically
            const response = await axiosClient.post('/auth/refresh');
            const { token: accessToken, user: userObj } = response.data;
            
            Cookies.set('accessToken', accessToken, { 
                secure: true, 
                sameSite: 'strict',
                expires: 7
            });
            Cookies.set('user', JSON.stringify(userObj), { 
                secure: true, 
                sameSite: 'strict',
                expires: 7
            });
            
            return userObj;
        },
        onSuccess: (userData) => {
            console.log('Token refreshed successfully');
            queryClient.setQueryData(['user'], userData);
        },
        onError: () => {
            // If refresh fails, logout the user
            logout();
        }
    });

    // Update user profile mutation
    const updateProfileMutation = useMutation({
        mutationFn: async (profileData) => {
            const response = await axiosClient.put('/auth/profile', profileData);
            return response.data.user || response.data;
        },
        onSuccess: (userData) => {
            Cookies.set('user', JSON.stringify(userData), { 
                secure: true, 
                sameSite: 'strict',
                expires: 7
            });
            queryClient.setQueryData(['user'], userData);
        }
    });

    const logout = () => {
        Cookies.remove('accessToken');
        Cookies.remove('user');
        
        // Call logout endpoint to clear httpOnly cookie on server
        axiosClient.post('/auth/logout').catch(() => {
            // Ignore errors, continue with client-side logout
        });
        
        // Clear all queries
        queryClient.clear();
        
        // Reset user query
        queryClient.setQueryData(['user'], null);
        
        router.push('/login');
    };

    return {
        user,
        isLoading,
        isAuthenticated: !!user,
        
        // Login
        login: loginMutation.mutateAsync,
        isLoggingIn: loginMutation.isPending,
        loginError: loginMutation.error,
        
        // Register
        register: registerMutation.mutateAsync,
        isRegistering: registerMutation.isPending,
        registerError: registerMutation.error,
        
        // Forgot password
        forgotPassword: forgotPasswordMutation.mutateAsync,
        isSendingResetEmail: forgotPasswordMutation.isPending,
        forgotPasswordError: forgotPasswordMutation.error,
        forgotPasswordSuccess: forgotPasswordMutation.isSuccess,
        
        // Reset password
        resetPassword: resetPasswordMutation.mutateAsync,
        isResettingPassword: resetPasswordMutation.isPending,
        resetPasswordError: resetPasswordMutation.error,
        
        // Refresh token
        refreshToken: refreshTokenMutation.mutateAsync,
        isRefreshing: refreshTokenMutation.isPending,
        
        // Update profile
        updateProfile: updateProfileMutation.mutateAsync,
        isUpdatingProfile: updateProfileMutation.isPending,
        updateProfileError: updateProfileMutation.error,
        
        // Logout
        logout
    };
};

export default useAuth;