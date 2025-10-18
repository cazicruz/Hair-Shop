'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCart } from '@/hooks/useCart';
import { setCart, clearCart } from '@/redux/cartSlice'; // Your Redux actions

function CartSync() {
  const dispatch = useDispatch();
  const { cart, isLoading } = useCart();

  useEffect(() => {
    if (cart?.data) {
      dispatch(setCart(cart.data));
    } else if (!isLoading && !cart) {
      dispatch(clearCart());
    }
  }, [cart, isLoading, dispatch]);

  return null; // This is just a sync component
}

export default CartSync;