import React, { useState } from "react";
import axios from "../../api/axios";

const AdminAddDevelopers = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      // 🔴 IMPORTANT FIX
      if (!token) {
        setType("error");
        setMessage("Admin not logged in ❌");
        setLoading(false);
        return;
      }

      const res = await axios.post(
        "/developers/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setType("success");
      setMessage(res?.data?.message || "Developer added successfully ✅");

      setFormData({
        name: "",
        email: "",
        password: "",
      });

    } catch (err) {
      console.log("ADD DEV ERROR:", err);

      setType("error");
      setMessage(
        err.response?.data?.message ||
        err.message ||
        "Something went wrong ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>

      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.iconBox}>👨‍💻</div>
          <h1 style={styles.title}>Add Developer</h1>
          <p style={styles.subtitle}>
            Create new developer account for your team panel.
          </p>
        </div>

        {/* Alert */}
        {message && (
          <div
            style={{
              ...styles.alert,
              background:
                type === "success"
                  ? "rgba(46, 204, 113,0.12)"
                  : "rgba(231, 76, 60,0.12)",
              color: type === "success" ? "#27ae60" : "#e74c3c",
            }}
          >
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.group}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter developer name"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="developer@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Password</label>

            <div style={styles.passwordWrap}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{ ...styles.input, border: "none" }}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeBtn}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Creating..." : "➕ Add Developer"}
          </button>
        </form>

        <div style={styles.footer}>
          Secure admin action • Token protected
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f6f9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    position: "absolute",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "rgba(0,0,0,.05)",
    top: "-80px",
    right: "-80px",
  },

  card: {
    width: "100%",
    maxWidth: "480px",
    background: "#fff",
    padding: "30px",
    borderRadius: "18px",
    boxShadow: "0 20px 40px rgba(0,0,0,.1)",
  },

  header: { textAlign: "center", marginBottom: "20px" },
  iconBox: { fontSize: "40px" },
  title: { fontSize: "26px", margin: "10px 0" },
  subtitle: { fontSize: "14px", color: "#6b7280" },

  alert: {
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "15px",
    textAlign: "center",
  },

  form: { display: "flex", flexDirection: "column", gap: "14px" },

  group: { display: "flex", flexDirection: "column" },
  label: { fontSize: "14px", marginBottom: "5px" },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ccc",
  },

  passwordWrap: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: "10px",
  },

  eyeBtn: {
    border: "none",
    background: "transparent",
    padding: "10px",
    cursor: "pointer",
  },

  button: {
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "#0d6efd",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },

  footer: {
    marginTop: "15px",
    textAlign: "center",
    fontSize: "12px",
    color: "#6b7280",
  },
};

export default AdminAddDevelopers;