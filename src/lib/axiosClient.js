import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const backendURL=process.env.NEXT_PUBLIC_API_URL;


const axiosClient = axios.create({
  baseURL: backendURL || 'https://e-com-backend-m68j.onrender.com/api',
  withCredentials: true, // ensures httpOnly refresh cookie is sent
  headers: {
    'Content-Type': 'application/json',
  },
});


// Request interceptor to add token to headers
axiosClient.interceptors.request.use(
    (config) => {
        const token = Cookies.get('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// Response interceptor to handle token refresh
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // If the failing request is an auth endpoint we want granular handling:
        // - 401 (invalid credentials) should be passed back to the caller so UI (login/register) can show validation errors.
        // - 429 or 5xx errors are server-side/rate-limit problems: show a toast and reject without redirecting.
        // - /auth/refresh and other non-login endpoints should keep the refresh flow below.
        let isAuthEndpoint = false;

        // ✅ Whitelist cart endpoint - don't redirect on 401
        const cartEndpoints = ['/about','/cart/', '/api/cart/add', '/api/cart/remove', '/api/cart/clear', '/api/cart/update-quantity', '/api/cart/calculate-total'];
        // const isCartEndpoint = cartEndpoints.some(endpoint => 
        //     originalRequest?.url?.includes(endpoint)
        // );

        
        try {
            const authPaths = ['forgotPassword', '/auth/login', '/auth/register', '/auth/forgot-password', '/auth/reset-password', '/auth/logout'];
            const reqUrl = (originalRequest?.url || '') + (originalRequest?.baseURL || '');
            isAuthEndpoint = authPaths.some(p => reqUrl.includes(p));
            const isCartEndpoint = cartEndpoints.some(p => reqUrl.includes(p));


            if (isCartEndpoint) {
            // Just reject without redirecting for cart endpoints
            return Promise.reject(error);
            }

            if (isAuthEndpoint) {
                const status = error.response?.status;

                // Let the UI handle invalid credentials (401)
                if (status === 401) {
                    return Promise.reject(error);
                }

                // For rate limiting (429) or server errors (5xx), show a toast and reject
                if (status === 429 || (status >= 500 && status <= 599)) {
                    try {
                        const message = error.response?.data?.message || 'Server error. Please try again later.';
                        toast.error(message, { toastId: `auth-error-${status}` });
                    } catch (e) {
                        // ignore toast errors
                    }
                    return Promise.reject(error);
                }

                // For other statuses on auth endpoints, just reject and let caller decide
                return Promise.reject(error);
            }
        } catch (e) {
            // ignore and continue to existing handling
        }

        // If error is not 401 or request has already been retried, reject
        if (error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }

        // If we're already refreshing, queue this request
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            })
                .then(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return axiosClient(originalRequest);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        // const refreshToken = Cookies.get('refreshToken');

        // if (!refreshToken) {
        //     // No refresh token, redirect to login
        //     isRefreshing = false;
        //     Cookies.remove('accessToken');
        //     Cookies.remove('refreshToken');
        //     Cookies.remove('user');
            
        //     if (typeof window !== 'undefined') {
        //         window.location.href = '/login';
        //     }
        //     return Promise.reject(error);
        // }

        try {
            // Try to refresh the token
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL || 'https://e-com-backend-m68j.onrender.com/api'}/auth/refresh`,
                { /* refreshToken */ },
                { withCredentials: true }
            );

            const { token: accessToken, user } = response.data;

            // Update cookies
            Cookies.set('accessToken', accessToken, { 
                secure: true, 
                sameSite: 'strict',
                expires: 7
            });
            Cookies.set('user', JSON.stringify(user), { 
                secure: true, 
                sameSite: 'strict',
                expires: 7
            });

            // Update the failed request with new token
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;

            // Process queued requests
            processQueue(null, accessToken);
            isRefreshing = false;

            // Retry the original request
            return axiosClient(originalRequest);
        } catch (refreshError) {
            // Refresh failed, logout user
            processQueue(refreshError, null);
            isRefreshing = false;

            Cookies.remove('accessToken');
            Cookies.remove('user');

            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }

            return Promise.reject(refreshError);
        }
    }
);
export default axiosClient;
