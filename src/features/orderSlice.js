// src/redux/orderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
  },
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    cancelOrderRedux: (state, action) => {
      state.orders = state.orders.map((order) =>
        order._id === action.payload ? { ...order, status: "Cancelled" } : order
      );
    },
    updateOrderStatusInStore: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find((o) => o._id === orderId);
      if (order) {
        order.status = status + "delivered";
      }
    },
  },
});

export const {
  addOrder,
  updateOrderStatusInStore,
  setOrders,
  cancelOrderRedux,
} = orderSlice.actions;

export default orderSlice.reducer;
