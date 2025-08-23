// import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'http://localhost:4000/api', // ✅ Backend API base URL
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Attach token automatically for all requests
// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default instance;   




// import axios from "axios";

// const instance = axios.create({
//   baseURL: "http://localhost:4000/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// instance.interceptors.request.use(
//   (config) => {
//     // ✅ Admin token first, fallback dev token
//     const adminToken = localStorage.getItem("token"); // admin token
//     const devToken = localStorage.getItem("devToken"); // developer token

//     if (adminToken) {
//       config.headers.Authorization = `Bearer ${adminToken}`;
//     } else if (devToken) {
//       config.headers.Authorization = `Bearer ${devToken}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default instance;
  

// axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/api",
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
