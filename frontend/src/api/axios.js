import axios from "axios";

const instance =
  axios.create({

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

    /* =========================
       ADMIN ROUTES
    ========================= */

    if (

      config.url?.includes(
        "/admin"
      )

      ||

      config.url?.includes(
        "/developers"
      )

      ||

      config.url?.includes(
        "/tasks"
      )

    ) {

      if (adminToken) {

        config.headers.Authorization =
          `Bearer ${adminToken}`;
      }
    }

    /* =========================
       DEVELOPER ROUTES
    ========================= */

    if (

      config.url?.includes(
        "/developer"
      )

    ) {

      if (devToken) {

        config.headers.Authorization =
          `Bearer ${devToken}`;
      }
    }

    return config;
  },

  (error) =>
    Promise.reject(error)

);

export default instance;