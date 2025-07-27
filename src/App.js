import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Marketplace from "./pages/Marketplace";
import CartPage from "./pages/CartPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setToken, setUser } from "./features/authSlice";
import axios from "./utils/axios";
import OrderForm from "./pages/OrderForm";
import MyOrders from "./pages/MyOrders";
import TrackOrder from "./pages/TrackOrder";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setToken(token));

      axios
        .get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const user = res.data.user;
          dispatch(setUser(user));

          // 🟠 Removed: dispatch(loadCart(user._id));
        })
        .catch(() => localStorage.removeItem("token"));
    }
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/place-order" element={<OrderForm />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/track-order" element={<TrackOrder />} />
      </Routes>
    </Router>
  );
};

export default App;
