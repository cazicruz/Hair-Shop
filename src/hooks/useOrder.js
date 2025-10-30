'use client';
import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosClient from '@/lib/axiosClient';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import useAdminQuery from './useAdminQuery';

// Centralized route definitions
const orderRoutes = {
    createOrderAndInitiatePayment: '/order/',
    getUserOrders: '/order/user',
    verifyOrderPayment: '/order/verifypayment',
    getAllOrders: '/order',
    updateOrderStatus: '/order/status',
    getOrderById: (id) => `/order/${id}`,
    softDeleteOrder: (id) => `/order/${id}`,
    hardDeleteOrder: (id) => `/order/${id}`,
};

// --- Hook
export function useOrderById(orderId) {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: async () => {
      const res = await axiosClient.get(orderRoutes.getOrderById(orderId));
      return res.data.data;
    },
    enabled: !!orderId,
  });
}

export function useOrder() {
    const queryClient = useQueryClient();

    // --- GET: User orders
    const {
        data: userOrders,
        isLoading: isUserOrdersLoading,
        isError: isUserOrdersError,
    } = useQuery({
        queryKey: ['userOrders'],
        queryFn: async () => {
            const res = await axiosClient.get(orderRoutes.getUserOrders);
            return res.data.data;
        },
        enabled: !!Cookies.get('accessToken'), // Only fetch if authenticated
    });

    // --- GET: All orders (admin)
    const {
        data: allOrders,
        isLoading: isAllOrdersLoading,
        isError: isAllOrdersError,
    } = useQuery({
        queryKey: ['allOrders'],
        queryFn: async () => {
            const res = await axiosClient.get(orderRoutes.getAllOrders);
            return res.data.data;
        },
        enabled: false, // Only fetch when explicitly called
    });

    // --- GET: Order by ID
    // const getOrderById = (orderId) => {
    //     return useQuery({
    //         queryKey: ['order', orderId],
    //         queryFn: async () => {
    //             const res = await axiosClient.get(orderRoutes.getOrderById(orderId));
    //             return res.data.data;
    //         },
    //         enabled: !!orderId,
    //     });
    // };

    // --- POST: Create order and initiate payment
    const createOrderAndInitiatePayment = useMutation({
        mutationFn: async (orderData) => {
            const res = await axiosClient.post(orderRoutes.createOrderAndInitiatePayment, orderData);
            return res.data.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['userOrders'] });
            toast.success('Order created successfully!', { className: 'toast-success' });
            return data;
        },
        onError: (error) => {
            console.error("Error creating order:", error);
            const message = error?.response?.data?.message || error?.message || 'Error creating order';
            toast.error(message, { className: 'toast-error' });
        },
    });

    // --- POST: Verify order payment
    const verifyOrderPayment = useMutation({
        mutationFn: async (reference) => {
            const res = await axiosClient.post(orderRoutes.verifyOrderPayment, { reference });
            return res.data.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['userOrders'] });
            queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] });
            queryClient.invalidateQueries({ queryKey: ['allOrders'] });
            toast.success('Payment verified successfully!', { className: 'toast-success' });
            return data;
        },
        onError: (error) => {
            console.error("Error verifying payment:", error);
            const message = error?.response?.data?.message || error?.message || 'Error verifying payment';
            toast.error(message, { className: 'toast-error' });
        },
    });

    // --- PATCH: Update order status (admin)
    const updateOrderStatus = useMutation({
        mutationFn: async ({ orderId, status }) => {
            const res = await axiosClient.patch(orderRoutes.updateOrderStatus, { 
                orderId, 
                status 
            });
            return res.data;
        },
        onSuccess: (data) => {
            // queryClient.invalidateQueries({ queryKey: ['userOrders'] });
            queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] });
            queryClient.invalidateQueries({ queryKey: ['allOrders'] });
            queryClient.invalidateQueries({ queryKey: ['order', data.orderId] });
            toast.success('Order status updated successfully!', { className: 'toast-success' });
        },
        onError: (error) => {
            console.error("Error updating order status:", error);
            const message = error?.response?.data?.message || error?.message || 'Error updating order status';
            toast.error(message, { className: 'toast-error' });
        },
    });

    // --- DELETE: Soft delete order
    const softDeleteOrder = useMutation({
        mutationFn: async (orderId) => {
            const res = await axiosClient.delete(orderRoutes.softDeleteOrder(orderId));
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userOrders'] });
            queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] });
            queryClient.invalidateQueries({ queryKey: ['allOrders'] });
            toast.success('Order deleted successfully!', { className: 'toast-success' });
        },
        onError: (error) => {
            console.error("Error deleting order:", error);
            const message = error?.response?.data?.message || error?.message || 'Error deleting order';
            toast.error(message, { className: 'toast-error' });
        },
    });

    // --- DELETE: Hard delete order (admin only)
    const hardDeleteOrder = useMutation({
        mutationFn: async (orderId) => {
            const res = await axiosClient.delete(orderRoutes.hardDeleteOrder(orderId));
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userOrders'] });
            queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] });
            queryClient.invalidateQueries({ queryKey: ['allOrders'] });
            toast.success('Order permanently deleted!', { className: 'toast-success' });
        },
        onError: (error) => {
            console.error("Error hard deleting order:", error);
            const message = error?.response?.data?.message || error?.message || 'Error permanently deleting order';
            toast.error(message, { className: 'toast-error' });
        },
    });

    return {
        // Queries
        userOrders,
        isUserOrdersLoading,
        isUserOrdersError,
        allOrders,
        isAllOrdersLoading,
        isAllOrdersError,
        // getOrderById,
        
        // Mutations
        createOrderAndInitiatePayment,
        verifyOrderPayment,
        updateOrderStatus,
        softDeleteOrder,
        hardDeleteOrder,
    };
}