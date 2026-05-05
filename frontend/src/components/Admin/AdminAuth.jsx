// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../../api/axios";

// const AdminAuth = ({ mode = "login" }) => {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     companyName: "", // 🔥 IMPORTANT
//   });

//   const [loading, setLoading] = useState(false);

//   /* ===========================
//      AUTO REDIRECT IF LOGGED IN
//   ============================ */
//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       navigate("/admin/dashboard", { replace: true });
//     }
//   }, [navigate]);

//   /* ===========================
//      INPUT CHANGE
//   ============================ */
//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   /* ===========================
//      SUBMIT
//   ============================ */
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (mode === "login") {
//         const res = await axios.post("/admin/login", {
//           email: form.email,
//           password: form.password,
//         });

//         // ✅ SAVE TOKEN ONLY
//         localStorage.setItem("token", res.data.token);

//         alert("✅ Login Successful");
//         navigate("/admin/dashboard");

//       } else {
//         await axios.post("/admin/register", {
//           name: form.name,
//           email: form.email,
//           password: form.password,
//           companyName: form.companyName, // 🔥 IMPORTANT
//         });

//         alert("✅ Registration successful! Now login.");
//         navigate("/admin/login");
//       }

//     } catch (err) {
//       console.log("AUTH ERROR:", err.response?.data || err.message);

//       alert(
//         err.response?.data?.message ||
//         "❌ Something went wrong"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ===========================
//      UI
//   ============================ */
//   return (
//     <div style={styles.page}>
//       <div style={styles.card}>
//         <h2 style={styles.title}>
//           {mode === "login" ? "Admin Login" : "Admin Register"}
//         </h2>

//         <form onSubmit={handleSubmit} style={styles.form}>

//           {/* NAME */}
//           {mode === "register" && (
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               value={form.name}
//               onChange={handleChange}
//               required
//               style={styles.input}
//             />
//           )}

//           {/* COMPANY */}
//           {mode === "register" && (
//             <input
//               type="text"
//               name="companyName"
//               placeholder="Company Name"
//               value={form.companyName}
//               onChange={handleChange}
//               required
//               style={styles.input}
//             />
//           )}

//           {/* EMAIL */}
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             value={form.email}
//             onChange={handleChange}
//             required
//             style={styles.input}
//           />

//           {/* PASSWORD */}
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             required
//             style={styles.input}
//           />

//           {/* BUTTON */}
//           <button
//             type="submit"
//             disabled={loading}
//             style={styles.button}
//           >
//             {loading
//               ? "Processing..."
//               : mode === "login"
//               ? "🔑 Login"
//               : "🚀 Register"}
//           </button>
//         </form>

//         {/* SWITCH */}
//         <p style={styles.switch}>
//           {mode === "login"
//             ? "Don’t have an account?"
//             : "Already have an account?"}{" "}
//           <span
//             style={styles.link}
//             onClick={() =>
//               navigate(mode === "login" ? "/admin/register" : "/admin/login")
//             }
//           >
//             {mode === "login" ? "Register here" : "Login here"}
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   page: {
//     minHeight: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     background: "#f4f6f9",
//   },
//   card: {
//     background: "#fff",
//     padding: "30px",
//     borderRadius: "14px",
//     width: "100%",
//     maxWidth: "420px",
//     boxShadow: "0 10px 25px rgba(0,0,0,.1)",
//   },
//   title: {
//     textAlign: "center",
//     marginBottom: "20px",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "12px",
//   },
//   input: {
//     padding: "12px",
//     borderRadius: "8px",
//     border: "1px solid #ccc",
//   },
//   button: {
//     padding: "12px",
//     border: "none",
//     borderRadius: "8px",
//     background: "#0d6efd",
//     color: "#fff",
//     cursor: "pointer",
//   },
//   switch: {
//     marginTop: "15px",
//     textAlign: "center",
//   },
//   link: {
//     color: "#0d6efd",
//     cursor: "pointer",
//     textDecoration: "underline",
//   },
// };

// export default AdminAuth;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const AdminAuth = ({ mode = "login" }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    companyName: "",
  });

  const [loading, setLoading] = useState(false);

  // Auto redirect if logged in
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "login") {
        // साफ करो पुराने tokens
        localStorage.removeItem("token");
        localStorage.removeItem("devToken"); // 🔥 IMPORTANT

        const res = await axios.post("/admin/login", {
          email: form.email,
          password: form.password,
        });

        // ✅ सिर्फ admin token रखो
        localStorage.setItem("token", res.data.token);

        alert("✅ Login Successful");
        navigate("/admin/dashboard", { replace: true });

      } else {
        await axios.post("/admin/register", {
          name: form.name,
          email: form.email,
          password: form.password,
          companyName: form.companyName,
        });

        alert("✅ Registration successful! Now login.");
        navigate("/admin/login");
      }

    } catch (err) {
      console.log("AUTH ERROR:", err.response?.data || err.message);

      alert(
        err.response?.data?.message ||
        "❌ Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          {mode === "login" ? "Admin Login" : "Admin Register"}
        </h2>

        <form onSubmit={handleSubmit} style={styles.form}>

          {mode === "register" && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                style={styles.input}
              />

              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={form.companyName}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Processing..." : mode === "login" ? "🔑 Login" : "🚀 Register"}
          </button>
        </form>

        <p style={styles.switch}>
          {mode === "login"
            ? "Don’t have an account?"
            : "Already have an account?"}{" "}
          <span
            style={styles.link}
            onClick={() =>
              navigate(mode === "login" ? "/admin/register" : "/admin/login")
            }
          >
            {mode === "login" ? "Register here" : "Login here"}
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f9",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "14px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 10px 25px rgba(0,0,0,.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    background: "#0d6efd",
    color: "#fff",
    cursor: "pointer",
  },
  switch: {
    marginTop: "15px",
    textAlign: "center",
  },
  link: {
    color: "#0d6efd",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default AdminAuth;