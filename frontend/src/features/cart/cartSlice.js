import {createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updateItemQuantity: (state, action) => {
            const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
            if (itemIndex >= 0) {
                state.items[itemIndex].quantity = action.payload.quantity;
            }
        },
        clearCart: (state) => {
            state.items = [];
        }
    },
});

export const {addToCart, removeFromCart, updateItemQuantity, clearCart} = cartSlice.actions;

export default cartSlice.reducer;