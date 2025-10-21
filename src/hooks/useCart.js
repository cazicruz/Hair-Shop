'use client';
import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosClient from '@/lib/axiosClient';
import { setCart} from '@/redux/cartSlice';
import { useSelector,useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

// Centralized route definitions
const cartRoutes = {
  getUserCart: '/cart',
  addToCart: '/cart/add',
  removeCartItem: '/cart/remove',
  emptyCart: '/cart/clear',
  updateQuantity: '/cart/update-quantity',
  calculateCartTotal: '/cart/calculate-total',
};


export function useCart() {
  const queryClient = useQueryClient();
        const dispatch = useDispatch();

    const isAuthenticated = () => {
    const token = Cookies.get('accessToken');
    return !!token;
    };

  // --- GET: Fetch cart items
  const {
    data: cart,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const res = await axiosClient.get(cartRoutes.getUserCart);
      console.log("Fetched cart data:", res.data.data.cart);
      return res.data.data.cart;
    },
    enabled: isAuthenticated(), // only fetch if authenticated
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchOnWindowFocus: false,
  });



  // --- POST: Add to cart
  const addToCart = useMutation({
    mutationFn: async (item) => {
      const res = await axiosClient.post(cartRoutes.addToCart,{productId: item._id,quantity:`1`});
      console.log("Add to cart response:", res.data);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
    onError: (error) => {
      console.error("Error adding to cart:", error);
      const message = error?.message || 'Error adding to cart';
      toast.error(message, { className: 'toast-error' });
    },
  });


  //--- Post bulk add to cart

  const bulkAddToCart = useMutation({
    mutationFn: async (items) => {
      const res = await axiosClient.post(cartRoutes.addToCart, { items });
      console.log("Bulk add to cart response:", res.data);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
    onError: (error) => {
      console.error("Error bulk adding to cart:", error);
      const message = error?.message || 'Error bulk adding to cart';
      toast.error(message, { className: 'toast-error' });
    },
  });

  // --- PUT: Update item quantity
  const updateCartItem = useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }) => {
      const res = await axiosClient.patch(cartRoutes.updateQuantity, {
        productId,
        quantity,
      });
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  // --- DELETE: Remove a specific item
  const deleteCartItem = useMutation({
    mutationFn: async (productId) => {
      const res = await axiosClient.delete(`${cartRoutes.removeCartItem}`,{data:{productId}});
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  // --- DELETE ALL: Clear the entire cart
  const clearCart = useMutation({
    mutationFn: async () => {
      const res = await axiosClient.delete(cartRoutes.emptyCart);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  // --- GET: Calculate cart total (optional utility)
  const calculateCartTotal = useMutation({
    mutationFn: async () => {
      const res = await axiosClient.get(cartRoutes.calculateCartTotal);
      return res.data;
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
