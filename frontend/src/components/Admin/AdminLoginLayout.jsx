// import React, { useEffect } from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';

// const AdminLoginLayout = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const isAdmin = localStorage.getItem("isAdminLoggedIn") === "true";
//     if (token && isAdmin) {
//       navigate("/admin/dashboard"); // अगर पहले से login है तो direct dashboard
//     }
//   }, [navigate]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-teal-500 p-4">
//       <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
//         <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
//         </h1>
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default AdminLoginLayout;
