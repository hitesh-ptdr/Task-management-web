import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const AdminAuth = ({ mode = "login" }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdminLoggedIn") === "true";
    if (token && isAdmin) navigate("/admin/dashboard");
  }, [navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Always clear old login data first
      localStorage.removeItem("token");
      localStorage.removeItem("isAdminLoggedIn");

      if (mode === "login") {
        const res = await axios.post("/admin/login", {
          email: form.email,
          password: form.password,
        });

        // Save new session
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("isAdminLoggedIn", "true");

        alert("✅ Login Successful!");
        navigate("/admin/dashboard");
      } else {
        await axios.post("/admin/register", form);
        alert("✅ Registration successful! Please login.");
        navigate("/admin/login");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f8f9fa",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          {mode === "login" ? "Admin Login" : "Admin Register"}
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {mode === "register" && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            style={{
              padding: "12px",
              border: "none",
              borderRadius: "6px",
              background: mode === "login" ? "#00cec9" : "#6c5ce7",
              color: "#fff",
              cursor: "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading
              ? "Processing..."
              : mode === "login"
              ? "🔑 Login"
              : "🚀 Register"}
          </button>
        </form>
        <p
          style={{
            marginTop: "1rem",
            textAlign: "center",
            color: "#555",
          }}
        >
          {mode === "login"
            ? "Don’t have an account?"
            : "Already have an account?"}{" "}
          <span
            style={{
              color: mode === "login" ? "#00cec9" : "#6c5ce7",
              cursor: "pointer",
              textDecoration: "underline",
            }}
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

export default AdminAuth;
