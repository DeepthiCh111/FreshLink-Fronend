import React, { useState } from "react";
import axios from "../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TrackOrder from "./TrackOrder";
import { addOrder } from "../features/orderSlice";
import { clearCart } from "../features/cartSlice";

const OrderForm = () => {
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [paymentMode, setPaymentMode] = useState("Cash on Delivery");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderData, setOrderData] = useState(null);

  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not authenticated. Please login.");
        return;
      }

      const response = await axios.post(
        "/orders/add",
        {
          items: cartItems,
          address,
          mobile,
          paymentMode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrderData(response.data.order);
    } catch (err) {
      console.error("Order error:", err);
      setError(
        err.response?.data?.message ||
          "Something went wrong while placing order"
      );
    } finally {
      setLoading(false);
    }
  };

  if (orderData) {
    dispatch(addOrder(orderData));
    return (
      <TrackOrder
        orderId={orderData._id}
        status={orderData.status}
        address={orderData.address}
        items={orderData.items}
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleOrderSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
          Place Your Order
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
            rows={3}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Mobile Number</label>
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Payment Mode</label>
          <select
            value={paymentMode}
            onChange={(e) => setPaymentMode(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
          >
            <option value="Cash on Delivery">COD</option>
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
          </select>
        </div>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-800 transition"
        >
          {loading ? "Placing Order..." : "Confirm Order"}
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
