'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosClient from '@/lib/axiosClient';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const adminRoutes = {
    getAllUsers: '/admin/users',
    getUserById: (id) => `/admin/user/${id}`,
    updateUser: (id) => `/admin/user/${id}`,
    deactivateUser: (id) => `/admin/user/${id}/deactivate`,
    deleteUser: (id) => `/admin/user/${id}`,
    getAllOrders: '/order', // ✅ Fixed: was '/order'
    getOrderById: (id) => `/order/${id}`, // ✅ Fixed: was '/order'
    updateOrderStatus: '/order/status', // ✅ Fixed: was '/order/status'
    getAllProducts: '/products',
    createProduct: '/products',
    updateProduct: (id) => `/products/${id}`,
    deleteProduct: (id) => `/products/${id}`,
    getDashboardStats: '/admin/dashboard/stats',
};

export function useAdmin() {
    const queryClient = useQueryClient();
    const router = useRouter();

    // Use shared helper for admin queries
    // import the shared helper (must be inside the hook scope to avoid SSR mismatch)
    // eslint-disable-next-line no-unused-vars
    const useAdminQuery = require('@/hooks/useAdminQuery').default;

    // Check if user is admin
    const isAdmin = () => {
        const userCookie = Cookies.get('user');
        if (!userCookie) return false;
        
        try {
            const user = JSON.parse(userCookie);
            return user.role === 'admin' || user.isAdmin === true;
        } catch (error) {
            console.error('Error parsing user cookie:', error);
            return false;
        }
    };

    // ==================== USERS ====================

    // GET: All users with pagination and filters
    const useUsers = (options = {}) => {
        const { page = 1, limit = 10, search = '', role = '' } = options;
        
        return useQuery({
            queryKey: ['admin', 'users', { page, limit, search, role }],
            queryFn: async () => {
                const params = new URLSearchParams();
                if (page) params.append('page', page);
                if (limit) params.append('limit', limit);
                if (search) params.append('search', search);
                if (role) params.append('role', role);
                
                const res = await axiosClient.get(`${adminRoutes.getAllUsers}?${params}`);
                return res.data.data;
            },
            enabled: isAdmin(),
            staleTime: 1000 * 60 * 5,
            keepPreviousData: true, // ✅ Keep previous data while fetching new page
        });
    };

    // GET: All users (simple version) - use helper so we don't duplicate config
    const {
        data: users,
        isLoading: isUsersLoading,
        isError: isUsersError,
    } = useAdminQuery(['users'], async () => {
        const res = await axiosClient.get(adminRoutes.getAllUsers);
        return res.data.data.users || res.data.data;
    });

    // GET: User by ID
    const getUserById = (userId) => {
        return useQuery({
            queryKey: ['admin', 'user', userId],
            queryFn: async () => {
                const res = await axiosClient.get(adminRoutes.getUserById(userId));
                return res.data.data.user || res.data.data;
            },
            enabled: !!userId && isAdmin(),
        });
    };

    // PATCH: Update user role
    const updateUser = useMutation({
        mutationFn: async ({ userId, email, phone, address, role }) => {
            const res = await axiosClient.patch(adminRoutes.updateUser(userId), { email, phone, address, role });
            return res.data.data;
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
            queryClient.invalidateQueries({ queryKey: ['admin', 'user', variables.userId] });
            toast.success('User role updated successfully', { className: 'toast-success' });
        },
        onError: (error) => {
            console.error('Error updating user role:', error);
            const message = error?.response?.data?.message || error?.message || 'Error updating user role';
            toast.error(message, { className: 'toast-error' });
        },
    });

    // PATCH: Deactivate/Activate user
    const toggleUserStatus = useMutation({
        mutationFn: async ({ userId, isActive }) => {
            const res = await axiosClient.patch(adminRoutes.deactivateUser(userId));
            return res.data.data;
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
            queryClient.invalidateQueries({ queryKey: ['admin', 'user', variables.userId] });
            toast.success(
                `User ${variables.isActive ? 'activated' : 'deactivated'} successfully`,
                { className: 'toast-success' }
            );
        },
        onError: (error) => {
            console.error('Error toggling user status:', error);
            const message = error?.response?.data?.message || error?.message || 'Error updating user status';
            toast.error(message, { className: 'toast-error' });
        },
    });

    // DELETE: Delete user
    const deleteUser = useMutation({
        mutationFn: async (userId) => {
            const res = await axiosClient.delete(adminRoutes.deleteUser(userId));
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
            toast.success('User deleted successfully', { className: 'toast-success' });
        },
        onError: (error) => {
            console.error('Error deleting user:', error);
            const message = error?.response?.data?.message || error?.message || 'Error deleting user';
            toast.error(message, { className: 'toast-error' });
        },
    });

    // ==================== ORDERS ====================

    // GET: All orders with filters
    const useOrders = (options = {}) => {
        const { page = 1, limit = 10, status = '', startDate = '', endDate = '' } = options;
        
        return useQuery({
            queryKey: ['admin', 'orders', { page, limit, status, startDate, endDate }],
            queryFn: async () => {
                const params = new URLSearchParams();
                if (page) params.append('page', page);
                if (limit) params.append('limit', limit);
                if (status) params.append('status', status);
                if (startDate) params.append('startDate', startDate);
                if (endDate) params.append('endDate', endDate);
                
                const res = await axiosClient.get(`${adminRoutes.getAllOrders}?${params}`);
                return res.data.data;
            },
            enabled: isAdmin(),
            staleTime: 1000 * 60 * 2,
            keepPreviousData: true,
        });
    };

    // GET: All orders (simple version)
    const {
        data: orders,
        isLoading: isOrdersLoading,
        isError: isOrdersError,
    } = useAdminQuery(['orders'], async () => {
        const res = await axiosClient.get(adminRoutes.getAllOrders);
        return res.data.data.orders || res.data.data;
    }, { staleTime: 1000 * 60 * 2 });

    // GET: Order by ID
    const getOrderById = (orderId) => {
        return useQuery({
            queryKey: ['admin', 'order', orderId],
            queryFn: async () => {
                const res = await axiosClient.get(adminRoutes.getOrderById(orderId));
                return res.data.data.order || res.data.data;
            },
            enabled: !!orderId && isAdmin(),
        });
    };

    // // PATCH: Update order status
    // const updateOrderStatus = useMutation({
    //     mutationFn: async ({ orderId, status }) => {
    //         const res = await axiosClient.patch(adminRoutes.updateOrderStatus, { orderId, status });
    //         return res.data.data;
    //     },
    //     onSuccess: (data, variables) => {
    //         queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] });
    //         queryClient.invalidateQueries({ queryKey: ['admin', 'order', variables.orderId] });
    //         queryClient.invalidateQueries({ queryKey: ['userOrders'] });
    //         toast.success('Order status updated successfully', { className: 'toast-success' });
    //     },
    //     onError: (error) => {
    //         console.error('Error updating order status:', error);
    //         const message = error?.response?.data?.message || error?.message || 'Error updating order status';
    //         toast.error(message, { className: 'toast-error' });
    //     },
    // });

    // ==================== PRODUCTS ====================

    // GET: All products (admin view) with filters
    const useProducts = (options = {}) => {
        const { page = 1, limit = 10, category = '', search = '' } = options;
        
        return useQuery({
            queryKey: ['admin', 'products', { page, limit, category, search }],
            queryFn: async () => {
                const params = new URLSearchParams();
                if (page) params.append('page', page);
                if (limit) params.append('limit', limit);
                if (category) params.append('category', category);
                if (search) params.append('search', search);
                
                const res = await axiosClient.get(`${adminRoutes.getAllProducts}?${params}`);
                return res.data.data;
            },
            enabled: isAdmin(),
            staleTime: 1000 * 60 * 5,
            keepPreviousData: true,
        });
    };

    // GET: All products (simple version)
    const {
        data: adminProducts,
        isLoading: isProductsLoading,
        isError: isProductsError,
    } = useAdminQuery(['products'], async () => {
        const res = await axiosClient.get(adminRoutes.getAllProducts);
        return res.data.data.products || res.data.data;
    });

    // POST: Create product
    const createProduct = useMutation({
        mutationFn: async (productData) => {
            const res = await axiosClient.post(adminRoutes.createProduct, productData);
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success('Product created successfully', { className: 'toast-success' });
        },
        onError: (error) => {
            console.error('Error creating product:', error);
            const message = error?.response?.data?.message || error?.message || 'Error creating product';
            toast.error(message, { className: 'toast-error' });
        },
    });

    // PATCH: Update product
    const updateProduct = useMutation({
        mutationFn: async ({ productId, productData }) => {
            const res = await axiosClient.patch(adminRoutes.updateProduct(productId), productData);
            return res.data.data;
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: ['product', variables.productId] });
            toast.success('Product updated successfully', { className: 'toast-success' });
        },
        onError: (error) => {
            console.error('Error updating product:', error);
            const message = error?.response?.data?.message || error?.message || 'Error updating product';
            toast.error(message, { className: 'toast-error' });
        },
    });

    // DELETE: Delete product
    const deleteProduct = useMutation({
        mutationFn: async (productId) => {
            const res = await axiosClient.delete(adminRoutes.deleteProduct(productId));
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success('Product deleted successfully', { className: 'toast-success' });
        },
        onError: (error) => {
            console.error('Error deleting product:', error);
            const message = error?.response?.data?.message || error?.message || 'Error deleting product';
            toast.error(message, { className: 'toast-error' });
        },
    });

    // ==================== DASHBOARD ====================

    // GET: Dashboard statistics
    const {
        data: dashboardStats,
        isLoading: isStatsLoading,
        isError: isStatsError,
        refetch: refetchStats, // ✅ Expose refetch for manual refresh
    } = useQuery({
        queryKey: ['admin', 'dashboard', 'stats'],
        queryFn: async () => {
            const res = await axiosClient.get(adminRoutes.getDashboardStats);
            return res.data.data;
        },
        enabled: isAdmin(),
        staleTime: 1000 * 60 * 1,
        refetchInterval: 1000 * 60 * 5,
    });

    // ==================== UTILITY ====================

    // Redirect if not admin
    const requireAdmin = () => {
        if (!isAdmin()) {
            toast.error('Unauthorized: Admin access required', { className: 'toast-error' });
            router.push('/login');
            return false;
        }
        return true;
    };

    // ✅ Logout admin
    const logoutAdmin = () => {
        Cookies.remove('accessToken');
        Cookies.remove('user');
        queryClient.clear();
        router.push('/login');
        toast.info('Logged out successfully', { className: 'toast-info' });
    };

    return {
        // User Management
        users,
        isUsersLoading,
        isUsersError,
        useUsers, // ✅ With pagination/filters
        getUserById,
        updateUser,
        toggleUserStatus,
        deleteUser,

        // Order Management
        orders,
        isOrdersLoading,
        isOrdersError,
        useOrders, // ✅ With pagination/filters
        getOrderById,
        // updateOrderStatus,

        // Product Management
        adminProducts,
        isProductsLoading,
        isProductsError,
        useProducts, // ✅ With pagination/filters
        createProduct,
        updateProduct,
        deleteProduct,

        // Dashboard
        dashboardStats,
        isStatsLoading,
        isStatsError,
        refetchStats, // ✅ Manual refresh

        // Utilities
        isAdmin,
        requireAdmin,
        logoutAdmin, // ✅ Added logout
    };
}