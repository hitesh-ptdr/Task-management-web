import React, { useState } from "react";
import axios from "../../api/axios";

const AdminAddDevelopers = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // ✅ Fetch token from localStorage

      const res = await axios.post(
        "/developers/add", // backend route
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ attach token
          },
        }
      );

      setMessage(res.data.message);
      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Error adding developer");
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
        background: "linear-gradient(135deg, #74ebd5, #acb6e5)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "#fff",
          borderRadius: "15px",
          padding: "40px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            marginBottom: "25px",
            fontSize: "1.8rem",
            color: "#2d3436",
            fontWeight: "700",
          }}
        >
          ➕ Add New Developer
        </h2>

        {message && (
          <p
            style={{
              color: message.includes("❌") ? "#e74c3c" : "#27ae60",
              fontWeight: "500",
              marginBottom: "20px",
              fontSize: "1rem",
            }}
          >
            {message}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <input
            type="text"
            name="name"
            placeholder="👨 Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "1rem",
              transition: "0.3s",
            }}
          />

          <input
            type="email"
            name="email"
            placeholder="📧 Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "1rem",
              transition: "0.3s",
            }}
          />

          <input
            type="password"
            name="password"
            placeholder="🔑 Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "1rem",
              transition: "0.3s",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "15px",
              borderRadius: "10px",
              border: "none",
              background: "linear-gradient(90deg, #6c5ce7, #00b894)",
              color: "#fff",
              fontWeight: "700",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseEnter={(e) =>
              (e.target.style.background = "linear-gradient(90deg, #00b894, #6c5ce7)")
            }
            onMouseLeave={(e) =>
              (e.target.style.background = "linear-gradient(90deg, #6c5ce7, #00b894)")
            }
          >
            {loading ? "Adding..." : "➕ Add Developer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddDevelopers;
