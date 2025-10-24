import { AppDispatch } from '../redux/store';
import { addItem, removeItem, updateQuantity } from '../redux/cartSlice';
import { useCart } from '@/hooks/useCart';

// This hook can’t be used directly in a thunk (outside React),
// so we’ll expose helper functions to be called inside components instead.
export const useCartActions = () => {
  const { addToCart, deleteCartItem, updateCartItem } = useCart();

  return {
    addItemToCart:
      (item) => async (dispatch) => {
        // dispatch(addItem(item)); // update UI instantly
        await addToCart.mutateAsync(item); // sync with server
      },

    removeItemFromCart:
      (id) => async (dispatch) => {
        // dispatch(removeItem(id));
        await deleteCartItem.mutateAsync(id);
      },

    updateCartQuantity:
      (id, quantity) => async (dispatch) => {
        // dispatch(updateQuantity({ id, quantity }));
        await updateCartItem.mutateAsync({ productId: id, quantity });
      },
  };
};
