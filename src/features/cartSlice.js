// src/features/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // each item: { product, quantity }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
    },
    increaseQty(state, action) {
      const item = state.items.find(
        (item) => item.product.id === action.payload
      );
      if (item) item.quantity += 1;
    },
    decreaseQty(state, action) {
      const item = state.items.find(
        (item) => item.product.id === action.payload
      );
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
