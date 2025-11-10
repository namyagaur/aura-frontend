import { useState } from "react";
import { API } from "../api";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/users/register", form);
      alert("Registration successful! Please login.");
      nav("/login");
    } catch (err) {
      alert("Error registering user");
      console.error(err);
    }
  };

  return (
    <AuthLayout mode="register">
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          placeholder="Full Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          type="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">Create Account</button>
      </form>
      <p className="auth-switch">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </AuthLayout>
  );
}
