import React from "react";

const SupplierCard = ({ supplier }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-60">
      <img
        src={supplier.image}
        alt={supplier.name}
        className="w-full h-32 object-cover rounded"
      />
      <h3 className="text-md font-semibold mt-2">{supplier.name}</h3>
      <p className="text-sm text-gray-600">📍 {supplier.address}</p>
      <p className="text-yellow-500 font-bold mt-1">⭐ {supplier.rating}</p>
    </div>
  );
};

export default SupplierCard;
