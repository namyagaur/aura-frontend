import { useState, useContext } from "react";
import { API } from "../api";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AuthLayout from "../layout/AuthLayout";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/users/login", form);
      console.log("Login response:", res.data);

      const token = res.data.token;
      const user = res.data.user;

      if(!token || !user){
        alert("No token or user data received");
        return
      }
      localStorage.setItem("token", token);
      login(user);
      nav("/");
    } catch (err) {
      alert("Login failed");
      console.error(err);
    }
  };

  return (
    <AuthLayout mode="login">
      <form onSubmit={handle} className="auth-form">
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
        <button type="submit">Login</button>
      </form>
      <p className="auth-switch">
        Don’t have an account? <Link to="/register">Register here</Link>
      </p>
    </AuthLayout>
  );
}
