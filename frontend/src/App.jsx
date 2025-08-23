import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbars/Navbar";

// Home
import Home from "./components/Home/Home";

// Layouts
import AdminSidebarLayout from "./components/Admin/AdminSidebarLayout";
import DeveloperLoginLayout from "./components/Developer/DeveloperLoginLayout";
import DeveloperSidebarLayout from "./components/Developer/DeveloperSidebarLayout";

// Admin Pages
import AdminLogin from "./components/Admin/AdminLogin";
import AdminRegister from "./components/Admin/AdminRegister";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminAddDevelopers from "./components/Admin/AdminAddDevelopers";
import AdminAllDevelopers from "./components/Admin/AdminAllDevelopers";
import AdminAddTask from "./components/Admin/AdminAddTask";
import AdminAllTask from "./components/Admin/AdminAllTask";
import AdminCompletedTask from "./components/Admin/AdminCompletedTask";
import AdminPendingTask from "./components/Admin/AdminPendingTask";
import AdminProgressTask from "./components/Admin/AdminProgressTask";

// Developer Pages
import DeveloperLogin from "./components/Developer/DeveloperLogin";
import DeveloperDashboard from "./components/Developer/DeveloperDashboard";
import MyTasks from "./components/Developer/MyTasks.jsx";
import Profile from "./components/Developer/Profile.jsx";
import Settings from "./components/Developer/Settings.jsx";

// Protected Routes
import ProtectedRoute from "./components/ProtectedRoute";
import DeveloperProtectedRoute from "./components/Developer/DeveloperProtectedRoute";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Admin Auth */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />

        {/* Admin Protected Routes */}
        <Route path="/admin" element={<AdminSidebarLayout />}>
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="add-developer"
            element={
              <ProtectedRoute>
                <AdminAddDevelopers />
              </ProtectedRoute>
            }
          />
          <Route
            path="all-developer"
            element={
              <ProtectedRoute>
                <AdminAllDevelopers />
              </ProtectedRoute>
            }
          />
          <Route
            path="add-task"
            element={
              <ProtectedRoute>
                <AdminAddTask />
              </ProtectedRoute>
            }
          />
          <Route
            path="all-task"
            element={
              <ProtectedRoute>
                <AdminAllTask />
              </ProtectedRoute>
            }
          />
          <Route
            path="completed-task"
            element={
              <ProtectedRoute>
                <AdminCompletedTask />
              </ProtectedRoute>
            }
          />
          <Route
            path="pending-task"
            element={
              <ProtectedRoute>
                <AdminPendingTask />
              </ProtectedRoute>
            }
          />
          <Route
            path="progress-task"
            element={
              <ProtectedRoute>
                <AdminProgressTask />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Developer Auth */}
        <Route path="/developer" element={<DeveloperLoginLayout />}>
          {/* Login routes */}
          <Route index element={<DeveloperLogin />} />
          <Route path="login" element={<DeveloperLogin />} />

          {/* Developer Protected Routes with sidebar layout */}
          <Route
            path="dashboard"
            element={
              <DeveloperProtectedRoute>
                <DeveloperSidebarLayout />
              </DeveloperProtectedRoute>
            }
          >
            <Route index element={<DeveloperDashboard />} />
            <Route path="my-tasks" element={<MyTasks />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Catch all - 404 page */}
        <Route
          path="*"
          element={<h2 style={{ padding: "2rem" }}>404 - Page Not Found</h2>}
        />
      </Routes>
    </Router>
  );
};

export default App;


// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbars/Navbar";

// // Home
// import Home from "./components/Home/Home";

// // Layouts
// import AdminSidebarLayout from "./components/Admin/AdminSidebarLayout";
// import DeveloperLoginLayout from "./components/Developer/DeveloperLoginLayout";
// import DeveloperSidebarLayout from "./components/Developer/DeveloperSidebarLayout"; // नया layout जिसमें sidebar है

// // Admin Pages
// import AdminLogin from "./components/Admin/AdminLogin";
// import AdminRegister from "./components/Admin/AdminRegister";
// import AdminDashboard from "./components/Admin/AdminDashboard";
// import AdminAddDevelopers from "./components/Admin/AdminAddDevelopers";
// import AdminAllDevelopers from "./components/Admin/AdminAllDevelopers";
// import AdminAddTask from "./components/Admin/AdminAddTask";
// import AdminAllTask from "./components/Admin/AdminAllTask";
// import AdminCompletedTask from "./components/Admin/AdminCompletedTask";
// import AdminPendingTask from "./components/Admin/AdminPendingTask";
// import AdminProgressTask from "./components/Admin/AdminProgressTask";

// // Developer Pages
// import DeveloperLogin from "./components/Developer/DeveloperLogin";
// import DeveloperDashboard from "./components/Developer/DeveloperDashboard"; 

// // Protected Routes
// import ProtectedRoute from "./components/ProtectedRoute";
// import DeveloperProtectedRoute from "./components/Developer/DeveloperProtectedRoute";

// const App = () => {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         {/* Home */}
//         <Route path="/" element={<Home />} />

//         {/* Admin Auth */}
//         <Route path="/admin/login" element={<AdminLogin />} />
//         <Route path="/admin/register" element={<AdminRegister />} />

//         {/* Admin Protected Routes */}
//         <Route path="/admin" element={<AdminSidebarLayout />}>
//           <Route
//             path="dashboard"
//             element={
//               <ProtectedRoute>
//                 <AdminDashboard />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="add-developer"
//             element={
//               <ProtectedRoute>
//                 <AdminAddDevelopers />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="all-developer"
//             element={
//               <ProtectedRoute>
//                 <AdminAllDevelopers />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="add-task"
//             element={
//               <ProtectedRoute>
//                 <AdminAddTask />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="all-task"
//             element={
//               <ProtectedRoute>
//                 <AdminAllTask />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="completed-task"
//             element={
//               <ProtectedRoute>
//                 <AdminCompletedTask />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="pending-task"
//             element={
//               <ProtectedRoute>
//                 <AdminPendingTask />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="progress-task"
//             element={
//               <ProtectedRoute>
//                 <AdminProgressTask />
//               </ProtectedRoute>
//             }
//           />
//         </Route>

//         {/* Developer Auth */}
//         <Route path="/developer" element={<DeveloperLoginLayout />}>
//           {/* Default login route */}
//           <Route index element={<DeveloperLogin />} />
//           <Route path="login" element={<DeveloperLogin />} />

//           {/* Developer Protected Routes with Sidebar Layout */}
//           <Route path="dashboard" element={ <DeveloperProtectedRoute> <DeveloperSidebarLayout /> </DeveloperProtectedRoute>}/>  
//             <Route/>    
//             <Route
//             path="dashboard"
//             element={
//               <DeveloperProtectedRoute>
//                 <DeveloperDashboard />
//               </DeveloperProtectedRoute> 
//             }
//           />   
//           {/* Aur bhi developer pages agar hai toh yaha add kar sakte ho */}
//         </Route>

//         {/* 404 Page */}
//         <Route
//           path="*"
//           element={<h2 style={{ padding: "2rem" }}>404 - Page Not Found</h2>}
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

