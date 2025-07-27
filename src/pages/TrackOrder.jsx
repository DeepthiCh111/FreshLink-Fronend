import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaBox, FaTruck } from "react-icons/fa";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateOrderStatusInStore } from "../features/orderSlice";

const TrackOrder = ({ orderId, status, address, items }) => {
  const [progress, setProgress] = useState(
    Number(status?.replace("%delivered", "")) || 0
  );

  const [stage, setStage] = useState("Order Placed");
  const dispatch = useDispatch();

  const stages = [
    {
      label: "Location Confirmed",
      icon: <FaMapMarkerAlt className="text-white" />,
    },
    { label: "Packing", icon: <FaBox className="text-white" /> },
    { label: "Out for Delivery", icon: <FaTruck className="text-white" /> },
  ];

  // Only simulate if status < 100
  useEffect(() => {
    if (status === "100%delivered") {
      setProgress(100);
    }
    if (progress >= 100) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [progress]);

  // Stage logic + DB update
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (progress < 40) setStage("Location Confirmed");
    else if (progress < 80) setStage("Packing");
    else setStage("Out for Delivery");

    if (progress === 100 && token) {
      axios
        .put(
          `/orders/order/${orderId}/status`,
          { status: "100%" },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => console.log("Order status updated in DB:", res.data))
        .catch((err) => {
          console.error("Failed to update order in DB:", err.message);
          dispatch(updateOrderStatusInStore({ orderId, status: "100%" }));
        });
    }
  }, [progress, orderId, dispatch]);

  if (!orderId || !items) {
    return (
      <p className="text-center mt-20 text-red-500">
        Invalid or missing order data
      </p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">
        Real-Time Order Tracking
      </h2>
      <p className="text-gray-700 mb-2">
        📦 <strong>Order ID:</strong> {orderId}
      </p>
      <p className="text-gray-700 mb-2">
        🚚 <strong>Status:</strong> {progress}% ({stage})
      </p>
      <p className="text-gray-700 mb-4">
        📍 <strong>Shipping to:</strong> {address}
      </p>

      <div className="flex justify-between items-center mb-6">
        {stages.map((s, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="rounded-full bg-green-500 p-2 shadow-md">
              {s.icon}
            </div>
            <span className="text-xs mt-1 text-gray-600">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-green-600 transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Items Ordered:
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 p-2 bg-gray-50 rounded shadow-sm"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-14 h-14 object-cover rounded-md border"
            />
            <span className="text-gray-800 font-medium">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackOrder;
