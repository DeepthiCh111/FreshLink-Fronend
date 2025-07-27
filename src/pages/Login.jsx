import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../features/authSlice";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      dispatch(setToken(res.data.token));
      dispatch(setUser(res.data.user));

      navigate("/marketplace");
    } catch (err) {
      console.error(err);
      alert("Login failed!");
    }
  };

  return (
    <div className="min-h-screen bg-green-700 flex items-center justify-center pt-20">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-2 p-2 border"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-4 p-2 border"
          required
        />
        <button className="bg-green-600 text-white px-4 py-2 w-full">
          Login
        </button>
        <p className="mt-3 text-sm">
          New here?{" "}
          <Link to="/register" className="text-orange-500">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
