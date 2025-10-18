'use client';
import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosClient from '@/lib/axiosClient';
import { setCart} from '@/redux/cartSlice';
import { useSelector,useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

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
  });

   useEffect(() => {
    if (cart) {
      console.log("Cart data on success:", cart.items);
      dispatch(setCart(cart.items));
    }
  }, [cart, dispatch]);

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
    updateCartItem,
    deleteCartItem,
    clearCart,
    calculateCartTotal,
  };
}
