

// axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://task-management-web-umd5.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request interceptor
instance.interceptors.request.use(
  (config) => {
    // Agar explicitly header set ho gaya ho, use karo
    if (!config.headers.Authorization) {
      // Admin token first
      const adminToken = localStorage.getItem("token");
      const devToken = localStorage.getItem("devToken");

      if (adminToken && config.url.includes("/admin")) {
        config.headers.Authorization = `Bearer ${adminToken}`;
      } else if (devToken && config.url.includes("/developers")) {
        config.headers.Authorization = `Bearer ${devToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;

