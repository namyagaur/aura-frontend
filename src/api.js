// src/api.js
import axios from "axios";

export const API = axios.create({
  baseURL: "https://aura-backend-1mvc.onrender.com/api", // 🔥 your actual Render backend link here
  withCredentials: false,
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
