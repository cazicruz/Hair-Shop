'use client';

import { useEffect } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { useCart } from '@/hooks/useCart';
import { setCart, clearCart } from '@/redux/cartSlice'; // Your Redux actions

function CartSync() {
  const dispatch = useDispatch();
  const { cart, isLoading } = useCart();
  const reduxCart = useSelector((state) => state.cart.items);
  const normalizeServerCart = (serverCart) => {
    return serverCart.map(item => ({
        ...item.productId, 
        quantity: item.quantity,
        cartItemId: item._id 
    }));
};

  useEffect(() => {
    console.log("Syncing cart data to Redux:", cart, reduxCart);
    if (cart?.items) {
      const normalizedCart = normalizeServerCart(cart.items);
      dispatch(setCart(normalizedCart));
    } else if (!isLoading && !cart) {
      dispatch(clearCart());
    }
  }, [cart, isLoading, dispatch]);

  return null; // This is just a sync component
}

export default CartSync;