import axios from "axios";


const instance = axios.create({
baseURL: "https://task-manager-app-backend-a87f.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const adminToken = localStorage.getItem("adminToken");
    const devToken = localStorage.getItem("devToken");
    const url = config.url || "";

    /* =====================================
       1. PUBLIC ROUTES (No Token Needed)
       ===================================== */
    const publicRoutes = ["/admin/login", "/admin/register", "/developers/login"];
    if (publicRoutes.some((route) => url.startsWith(route))) {
      return config;
    }

    /* =====================================
       2. EXCEPTION FOR ADMIN ACTIONS
       ===================================== */
    // Even though this starts with /developers, it's an admin action
    if (url.startsWith("/developers/add")) {
      if (adminToken) {
        config.headers.Authorization = `Bearer ${adminToken}`;
      }
      return config;
    }

    /* =====================================
       3. RELIABLE ROLE SELECTION (Based on API URL)
       ===================================== */
    // Check if the API request endpoint itself is designated for developers
    const isDeveloperApi = url.startsWith("/developers");

    if (isDeveloperApi) {
      if (devToken) {
        config.headers.Authorization = `Bearer ${devToken}`;
      }
    } else {
      // All other API requests (like /admin/dashboard, /tasks, etc.) get the admin token
      if (adminToken) {
        config.headers.Authorization = `Bearer ${adminToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;

