// src/pages/CartPage.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
} from "../features/cartSlice";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mt-24 mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">
          Your cart is empty .... Add items to your cart
        </p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center justify-between border p-2 rounded"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h4 className="font-semibold">{item.product.name}</h4>
                  <p>₹{item.product.price}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => dispatch(decreaseQty(item.product.id))}
                  className="bg-gray-200 px-2 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => dispatch(increaseQty(item.product.id))}
                  className="bg-gray-200 px-2 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => dispatch(removeFromCart(item.product.id))}
                  className="ml-4 text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="text-right mt-4">
            <h3 className="text-lg font-bold">Total: ₹{totalPrice}</h3>
            <button
              onClick={() => {
                navigate("/place-order");
                alert("On the way to place your order!");
              }}
              className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Order Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
