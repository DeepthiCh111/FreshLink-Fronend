import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaTruck } from "react-icons/fa";
import TrackOrder from "./TrackOrder";

const MyOrders = () => {
  const orders = useSelector((state) => state.order.orders);
  const [trackOrderData, setTrackOrderData] = useState(null);

  if (trackOrderData) {
    return (
      <TrackOrder
        orderId={trackOrderData._id}
        status={trackOrderData.status}
        address={trackOrderData.address}
        items={trackOrderData.items}
      />
    );
  }

  if (!orders.length) {
    return (
      <p className="text-center mt-24 text-lg font-semibold text-gray-600">
        No orders found.
      </p>
    );
  }

  return (
    <div className="p-8 mt-24">
      <h2 className="text-3xl font-bold mb-8 text-center text-green-700">
        My Orders
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border border-green-200 rounded-xl shadow-lg p-6 bg-white relative"
          >
            <div className="mb-4">
              <h3 className="text-lg font-bold text-green-800">
                Order ID:{" "}
                <span className="text-gray-700">
                  {order._id.slice(0, 8)}...
                </span>
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Created At: {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="mb-2 text-sm">
              <p>
                <span className="font-semibold text-gray-800">Status:</span>{" "}
                <span className="text-green-600 font-medium">
                  {order.status}
                </span>
              </p>
              <p>
                <span className="font-semibold text-gray-800">Address:</span>{" "}
                {order.address}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Mobile:</span>{" "}
                {order.mobile}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Payment:</span>{" "}
                {order.paymentMode}
              </p>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold text-gray-700 mb-2 text-base">
                Items:
              </h4>
              <ul className="space-y-4">
                {order.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg shadow-sm"
                  >
                    <img
                      src={item.image || "https://via.placeholder.com/60"}
                      alt={item.name}
                      className="w-16 h-16 rounded object-cover border"
                    />
                    <div className="text-sm">
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-gray-600">
                        {item.quantity} {item.unit} @ ₹{item.price}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <button
              className="mt-6 flex items-center gap-2 text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200"
              onClick={() => setTrackOrderData(order)}
            >
              <FaTruck /> Track Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
