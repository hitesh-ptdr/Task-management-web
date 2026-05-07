import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://task-management-web-umd5.onrender.com/api",

  headers: {
    "Content-Type":
      "application/json",
  },
});

/* ===================================
   REQUEST INTERCEPTOR
=================================== */
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

    /* ===================================
       PUBLIC ROUTES
    =================================== */

    const publicRoutes = [
      "/admin/login",
      "/admin/register",
      "/developers/login",
    ];

    const isPublicRoute =
      publicRoutes.some((route) =>
        url.startsWith(route)
      );

    // 🔥 PUBLIC ROUTES
    if (isPublicRoute) {
      return config;
    }

    /* ===================================
       DEVELOPER ROUTES
    =================================== */

    const developerRoutes = [
      "/developers/verify",
      "/developers/my",
      "/developers/profile",
      "/developers/update-profile",
      "/developers/upload-photo",
      "/developers/tasks",
      "/tasks/update-status",
      "/tasks",
    ];

    const isDeveloperRoute =
      developerRoutes.some((route) =>
        url.startsWith(route)
      );

    /* ===================================
       SET TOKEN
    =================================== */

    // ✅ DEVELOPER TOKEN
    if (
      devToken &&
      (
        isDeveloperRoute ||
        config.method === "patch" ||
        config.method === "put"
      )
    ) {

      config.headers.Authorization =
        `Bearer ${devToken}`;
    }

    // ✅ ADMIN TOKEN
    else if (adminToken) {

      config.headers.Authorization =
        `Bearer ${adminToken}`;
    }

    return config;
  },

  (error) =>
    Promise.reject(error)
);

export default instance;