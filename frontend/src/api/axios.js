

// import axios from "axios";

// const instance =
//   axios.create({

//     baseURL:
//       "https://task-management-web-umd5.onrender.com/api",

//     headers: {
//       "Content-Type":
//         "application/json",
//     },

//   });

// instance.interceptors.request.use(

//   (config) => {

//     const adminToken =
//       localStorage.getItem(
//         "adminToken"
//       );

//     const devToken =
//       localStorage.getItem(
//         "devToken"
//       );

//     /* =========================
//        ADMIN ROUTES
//     ========================= */

//     if (

//       config.url ===
//         "/developers"

//       ||

//       config.url?.startsWith(
//         "/admin"
//       )

//       ||

//       config.url?.startsWith(
//         "/tasks"
//       )

//       ||

//       config.url?.startsWith(
//         "/developers/add"
//       )

//       ||

//       config.url?.startsWith(
//         "/developers/"
//       ) &&
//       !config.url?.startsWith(
//         "/developers/login"
//       ) &&
//       !config.url?.startsWith(
//         "/developers/tasks"
//       ) &&
//       !config.url?.startsWith(
//         "/developers/verify"
//       ) &&
//       !config.url?.startsWith(
//         "/developers/update-profile"
//       ) &&
//       !config.url?.startsWith(
//         "/developers/upload-photo"
//       )

//     ) {

//       if (adminToken) {

//         config.headers.Authorization =
//           `Bearer ${adminToken}`;
//       }
//     }

//     /* =========================
//        DEVELOPER ROUTES
//     ========================= */

//     else if (

//       config.url?.startsWith(
//         "/developers/login"
//       )

//       ||

//       config.url?.startsWith(
//         "/developers/tasks"
//       )

//       ||

//       config.url?.startsWith(
//         "/developers/verify"
//       )

//       ||

//       config.url?.startsWith(
//         "/developers/update-profile"
//       )

//       ||

//       config.url?.startsWith(
//         "/developers/upload-photo"
//       )

//     ) {

//       if (devToken) {

//         config.headers.Authorization =
//           `Bearer ${devToken}`;
//       }
//     }

//     return config;
//   },

//   (error) =>
//     Promise.reject(error)

// );

// export default instance;

import axios from "axios";

const instance = axios.create({
  baseURL: "https://task-management-web-umd5.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/* ===================================
   REQUEST INTERCEPTOR
=================================== */
instance.interceptors.request.use(
  (config) => {
    const adminToken = localStorage.getItem("adminToken");
    const devToken = localStorage.getItem("devToken");

    /* ===================================
       DEVELOPER ROUTES
    =================================== */
    if (
      config.url?.startsWith("/developers/tasks") ||
      config.url?.startsWith("/developers/verify") ||
      config.url?.startsWith("/developers/update-profile") ||
      config.url?.startsWith("/developers/upload-photo") ||
      config.method === "patch"
    ) {
      if (devToken) {
        config.headers.Authorization = `Bearer ${devToken}`;
      }
    }

    /* ===================================
       ADMIN ROUTES
    =================================== */
    else {
      if (adminToken) {
        config.headers.Authorization = `Bearer ${adminToken}`;
      }
    }

    return config;
  },

  (error) => Promise.reject(error)
);

export default instance;