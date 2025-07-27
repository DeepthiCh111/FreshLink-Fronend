import React, { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", form);
      alert("Registered successfully!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input
        name="name"
        onChange={handleChange}
        placeholder="Name"
        required
        className="block w-full mb-2 p-2 border"
      />
      <input
        name="email"
        type="email"
        onChange={handleChange}
        placeholder="Email"
        required
        className="block w-full mb-2 p-2 border"
      />
      <input
        name="password"
        type="password"
        onChange={handleChange}
        placeholder="Password"
        required
        className="block w-full mb-2 p-2 border"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Register
      </button>
    </form>
  );
};

export default Register;
