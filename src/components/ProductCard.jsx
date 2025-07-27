// src/components/ProductCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // prevents navigation
    dispatch(addToCart(product));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-60 cursor-pointer hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-32 object-cover rounded"
      />
      <h3 className="text-md font-semibold mt-2">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.category}</p>
      <p className="text-green-600 font-bold mt-1">₹{product.price}</p>

      <button
        onClick={handleAddToCart}
        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-3 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
