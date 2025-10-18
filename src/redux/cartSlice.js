import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addItem: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find(i => i.id === item.id);
            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                console.log("Adding item to cart slice:", item);
                item.quantity = item.quantity || 1;
                state.items.push(item);
            }
        },
        removeItem: (state, action) => {
            const itemId = action.payload;
            state.items = state.items.filter(item => item.id !== itemId);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const existingItem = state.items.find(i => i.id === id);
            if (existingItem) {
                existingItem.quantity = quantity;
            }
        },
        setCart: (state, action) => {
            state.items = action.payload || [];
        },
        clearCart: (state) => {
            state.items = [];
        }
    },
});

export const { addItem, removeItem, updateQuantity, setCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;