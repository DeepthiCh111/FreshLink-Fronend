// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice"; // You can add more slices here
import cartReducer from "./features/cartSlice";
import orderReducer from "./features/orderSlice";
import searchReducer from "./features/searchSlice";
const store = configureStore({
  reducer: {
    auth: authReducer, // Add more slices as needed
    cart: cartReducer,
    order: orderReducer,
    search: searchReducer,
  },
});

export default store;
