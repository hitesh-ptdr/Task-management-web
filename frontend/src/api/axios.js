import axios from "axios";

const instance = axios.create({
  baseURL: "https://task-management-web-umd5.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const adminToken = localStorage.getItem("token");
    const devToken = localStorage.getItem("devToken");

    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }

    if (devToken) {
      config.headers.Authorization = `Bearer ${devToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;