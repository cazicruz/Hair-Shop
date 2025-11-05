'use client';
import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosClient from '@/lib/axiosClient';
import { setCart } from '@/redux/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

// Centralized route definitions
const cartRoutes = {
  getUserCart: '/cart/',
  addToCart: '/cart/add',
  removeCartItem: '/cart/remove',
  emptyCart: '/cart/clear',
  updateQuantity: '/cart/update-quantity',
  calculateCartTotal: '/cart/calculate-total',
};

export function useCart() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  // ✅ Get cartId outside of query
  const cartId = Cookies.get('cartId');

  // --- GET: Fetch cart items
  const {
    data: cart,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['cart'], // ✅ Add cartId to query key
    queryFn: async () => {
      const res = await axiosClient.get(cartRoutes.getUserCart, { 
        params: { id: cartId } 
      });
      return res.data.data.cart;
    },
    enabled: !!cartId, // ✅ Fixed: was checking undefined variable
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
  

  // --- POST: Add to cart
  const addToCart = useMutation({
    mutationFn: async (item) => {
      const currentCartId = Cookies.get('cartId');
      const res = await axiosClient.post(cartRoutes.addToCart, {
        cartId: currentCartId || null, // ✅ Handle no cart yet
        productId: item._id,
        quantity: 1 // ✅ Use number, not string
      });
      
      const newCart = res.data.data.cart;
      
      // ✅ Set cartId if it's a new cart
      if (newCart._id) {
        Cookies.set('cartId', newCart._id, { 
          secure: true, 
          sameSite: 'strict',
          expires: 7
        });
      }
      
      return newCart;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      // toast.success('Item added to cart', { className: 'toast-success' });
    },
    onError: (error) => {
      console.error("Error adding to cart:", error);
      const message = error?.response?.data?.message || error?.message || 'Error adding to cart';
      toast.error(message, { className: 'toast-error' });
    },
  });

  // --- POST: Bulk add to cart
  const bulkAddToCart = useMutation({
    mutationFn: async (items) => {
      const currentCartId = Cookies.get('cartId');
      const res = await axiosClient.post(cartRoutes.addToCart, { 
        cartId: currentCartId,
        items 
      });
      return res.data.data.cart;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Items added to cart', { className: 'toast-success' });
    },
    onError: (error) => {
      console.error("Error bulk adding to cart:", error);
      const message = error?.response?.data?.message || error?.message || 'Error bulk adding to cart';
      toast.error(message, { className: 'toast-error' });
    },
  });

  // --- PATCH: Update item quantity
  const updateCartItem = useMutation({
    mutationFn: async ({ productId, quantity }) => {
      const currentCartId = Cookies.get('cartId');
      const res = await axiosClient.patch(cartRoutes.updateQuantity, {
        cartId: currentCartId,
        productId,
        quantity,
      });
      return res.data.data.cart;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Quantity updated', { className: 'toast-success' });
    },
    onError: (error) => {
      console.error("Error updating quantity:", error);
      const message = error?.response?.data?.message || error?.message || 'Error updating quantity';
      toast.error(message, { className: 'toast-error' });
    },
  });

  // --- DELETE: Remove a specific item
  const deleteCartItem = useMutation({
    mutationFn: async (productId) => {
      const currentCartId = Cookies.get('cartId');
      const res = await axiosClient.delete(cartRoutes.removeCartItem, {
        data: { 
          cartId: currentCartId,
          productId 
        }
      });
      return res.data.data.cart;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Item removed from cart', { className: 'toast-success' });
    },
    onError: (error) => {
      console.error("Error removing item:", error);
      const message = error?.response?.data?.message || error?.message || 'Error removing item';
      toast.error(message, { className: 'toast-error' });
    },
  });

  // --- DELETE ALL: Clear the entire cart
  const clearCart = useMutation({
    mutationFn: async () => {
      const currentCartId = Cookies.get('cartId');
      const res = await axiosClient.delete(cartRoutes.emptyCart, {
        data: { cartId: currentCartId }
      });
      return res.data.data.cart;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Cart cleared', { className: 'toast-success' });
    },
    onError: (error) => {
      console.error("Error clearing cart:", error);
      const message = error?.response?.data?.message || error?.message || 'Error clearing cart';
      toast.error(message, { className: 'toast-error' });
    },
  });

  // --- GET: Calculate cart total
  const calculateCartTotal = useMutation({
    mutationFn: async (options = {}) => {
      const currentCartId = Cookies.get('cartId');
      const res = await axiosClient.get(cartRoutes.calculateCartTotal, {
        params: { 
          cartId: currentCartId,
          ...options // deliveryType, deliveryMethod, etc.
        }
      });
      return res.data.data.totals;
    },
  });

  return {
    cart,
    isLoading,
    isError,
    addToCart,
    bulkAddToCart,
    updateCartItem,
    deleteCartItem,
    clearCart,
    calculateCartTotal,
  };
}