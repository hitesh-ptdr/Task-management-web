import React, {
  useState,
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import axios from "../../api/axios";

const AdminAuth = ({
  mode = "login",
}) => {

  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: "",
      companyName: "",
    });

  const [loading, setLoading] =
    useState(false);

  const [checkingAuth,
    setCheckingAuth] =
    useState(true);

  /* ===========================
     AUTO LOGIN CHECK
  =========================== */
  useEffect(() => {

    const token =
      localStorage.getItem(
        "adminToken"
      );

    // NO TOKEN
    if (!token) {
      setCheckingAuth(false);
      return;
    }

    // VERIFY TOKEN
    axios
      .get(
        "/admin/verify-admin"
      )

      .then(() => {

        navigate(
          "/admin/dashboard",
          {
            replace: true,
          }
        );
      })

.catch((err) => {

  console.log(
    "Verify Error:",
    err.message
  );

  setCheckingAuth(false);
});

  }, []);

  /* ===========================
     INPUT
  =========================== */
  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });

  /* ===========================
     SUBMIT
  =========================== */
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setLoading(true);

      try {

        /* LOGIN */
        if (
          mode === "login"
        ) {

          const res =
            await axios.post(
              "/admin/login",
              {
                email:
                  form.email,

                password:
                  form.password,
              }
            );

          localStorage.setItem(
            "adminToken",
            res.data.token
          );

          localStorage.setItem(
            "adminData",
            JSON.stringify(
              res.data
            )
          );

          navigate(
            "/admin/dashboard",
            {
              replace: true,
            }
          );
        }

        /* REGISTER */
        else {

          await axios.post(
            "/admin/register",
            {
              name:
                form.name,

              email:
                form.email,

              password:
                form.password,

              companyName:
                form.companyName,
            }
          );

          alert(
            "✅ Registration Successful"
          );

          navigate(
            "/admin/login"
          );
        }

      } catch (err) {

        alert(
          err.response
            ?.data
            ?.message ||
            "Something went wrong"
        );

      } finally {

        setLoading(false);
      }
    };

  // 🔥 STOP LOGIN FLASH
 if (checkingAuth) {

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "18px",
        fontWeight: "600",
      }}
    >
      Loading...
    </div>
  );
}

  return (
    <div style={styles.page}>

      <div style={styles.card}>

        <h2 style={styles.title}>

          {mode === "login"
            ? "Admin Login"
            : "Admin Register"}

        </h2>

        <form
          onSubmit={
            handleSubmit
          }
          style={styles.form}
        >

          {mode ===
            "register" && (
            <>

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={
                  handleChange
                }
                required
                style={
                  styles.input
                }
              />

              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={
                  form.companyName
                }
                onChange={
                  handleChange
                }
                required
                style={
                  styles.input
                }
              />

            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={
              handleChange
            }
            required
            style={styles.input}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={
              form.password
            }
            onChange={
              handleChange
            }
            required
            style={styles.input}
          />

          <button
            type="submit"
            disabled={loading}
            style={styles.button}
          >

            {loading
              ? "Processing..."
              : mode ===
                "login"
              ? "🔑 Login"
              : "🚀 Register"}

          </button>

        </form>

      </div>

    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent:
      "center",
    alignItems:
      "center",
    background:
      "#f4f6f9",
  },

  card: {
    background:
      "#fff",
    padding: "30px",
    borderRadius: "14px",
    width: "100%",
    maxWidth: "420px",
    boxShadow:
      "0 10px 25px rgba(0,0,0,.1)",
  },

  title: {
    textAlign:
      "center",
    marginBottom:
      "20px",
  },

  form: {
    display: "flex",
    flexDirection:
      "column",
    gap: "12px",
  },

  input: {
    padding: "12px",
    borderRadius: "8px",
    border:
      "1px solid #ccc",
  },

  button: {
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    background:
      "#0d6efd",
    color: "#fff",
    cursor: "pointer",
    fontWeight:
      "600",
  },
};

export default AdminAuth;