import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://task-management-web-umd5.onrender.com/api",

  headers: {
    "Content-Type":
      "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {

    const adminToken =
      localStorage.getItem(
        "adminToken"
      );

    const devToken =
      localStorage.getItem(
        "devToken"
      );

    const url =
      config.url || "";

    /* ===========================
       PUBLIC ROUTES
    =========================== */

    const publicRoutes = [
      "/admin/login",
      "/admin/register",
      "/developers/login",
    ];

    const isPublicRoute =
      publicRoutes.some((route) =>
        url.startsWith(route)
      );

    if (isPublicRoute) {
      return config;
    }

    /* ===========================
       DEVELOPER ROUTES
    =========================== */

    const developerRoutes = [
      "/developers/verify",
      "/developers/my",
      "/developers/profile",
      "/developers/update-profile",
      "/developers/upload-photo",
      "/developers/tasks",
    ];

    const isDeveloperRoute =
      developerRoutes.some((route) =>
        url.startsWith(route)
      );

    /* ===========================
       TASK UPDATE ROUTES
    =========================== */
const isDeveloperTaskUpdate =
  url.startsWith("/tasks/");

    /* ===========================
       SET TOKEN
    =========================== */

    // ✅ DEV TOKEN
    if (
      (
        isDeveloperRoute ||
        isDeveloperTaskUpdate
      ) &&
      devToken
    ) {

      config.headers.Authorization =
        `Bearer ${devToken}`;
    }

    // ✅ ADMIN TOKEN
    else if (
      adminToken
    ) {

      config.headers.Authorization =
        `Bearer ${adminToken}`;
    }

    return config;
  },

  (error) =>
    Promise.reject(error)
);

export default instance;