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

    // ADMIN ROUTES
    if (
      config.url?.startsWith(
        "/admin"
      ) &&
      adminToken
    ) {

      config.headers.Authorization =
        `Bearer ${adminToken}`;
    }

    // DEVELOPER ROUTES
    else if (
      config.url?.startsWith(
        "/developers"
      ) &&
      devToken
    ) {

      config.headers.Authorization =
        `Bearer ${devToken}`;
    }

    return config;
  },

  (error) =>
    Promise.reject(error)

);

export default instance;