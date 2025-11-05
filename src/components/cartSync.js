'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query'; // ✅ Add missing import
import { useCart } from '@/hooks/useCart';
import { setCart, clearCart } from '@/redux/cartSlice';

function CartSync() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient(); // ✅ Move before usage
  const { cart, isLoading, bulkAddToCart } = useCart();
  const reduxCart = useSelector((state) => state.cart.items);
  const user = queryClient.getQueryData(['user']);

  const extractReduxCartIds = (cartItems) => { // ✅ Fixed typo: Redox -> Redux
    return cartItems.map(item => item._id ); // ✅ Changed from item.id to item._id
  };

  const normalizeServerCart = (serverCart) => {
    if (!serverCart) return [];
    return serverCart.map(item => ({
      ...item.productId,
      quantity: item.quantity,
      cartItemId: item._id
    }));
  };

  useEffect(() => {

    if (!isLoading) { // ✅ Check !isLoading to avoid premature sync
      const normalizedCart = normalizeServerCart(cart?.items);
        dispatch(setCart(normalizedCart));
      // if (cart?.items && cart.items.length > 0) {
      //   // Server has cart data - sync to Redux
      //   const normalizedCart = normalizeServerCart(cart.items);
      //   dispatch(setCart(normalizedCart));
      // } else if (!cart?.items || cart.items.length === 0) {
      //   // Server cart is empty but Redux has items - sync to server
      //   if (reduxCart && reduxCart.length > 0) {
      //     const cartIds = extractReduxCartIds(reduxCart);
      //     bulkAddToCart.mutate(cartIds); // ✅ Use mutate instead of mutateAsync
      //   } else {
      //     // Both empty - clear Redux to be safe
      //     dispatch(clearCart());
      //   }
      // }
    }
  }, [cart, isLoading, user, dispatch]); // ✅ Add user to dependencies

  return null;
}

export default CartSync;