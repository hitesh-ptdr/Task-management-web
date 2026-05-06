// AdminAuth.jsx

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

  /* ===========================
     AUTO LOGIN CHECK
  =========================== */
  useEffect(() => {

    const token =
      localStorage.getItem(
        "adminToken"
      );

    // ONLY LOGIN PAGE
    if (
      token &&
      window.location.pathname ===
        "/admin/login"
    ) {

      axios
        .get(
          "/admin/verify-admin",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        )

        .then(() => {

          navigate(
            "/admin/dashboard",
            {
              replace: true,
            }
          );

        })

        .catch(() => {

          // REMOVE INVALID TOKEN
          localStorage.removeItem(
            "adminToken"
          );

          localStorage.removeItem(
            "adminData"
          );
        });
    }

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

          // SAVE TOKEN
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

          alert(
            "✅ Login Successful"
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

        console.log(
          "AUTH ERROR:",
          err.response
            ?.data ||
            err.message
        );

        alert(
          err.response
            ?.data
            ?.message ||
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

          {/* REGISTER INPUTS */}
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

          {/* EMAIL */}
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

          {/* PASSWORD */}
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

          {/* BUTTON */}
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

        {/* SWITCH */}
        <p
          style={{
            marginTop: "15px",
            textAlign:
              "center",
          }}
        >

          {mode ===
            "login"
            ? "Don’t have an account?"
            : "Already have an account?"}

          {" "}

          <span
            style={{
              color:
                "#0d6efd",

              cursor:
                "pointer",

              textDecoration:
                "underline",

              fontWeight:
                "600",
            }}

            onClick={() =>
              navigate(
                mode ===
                  "login"
                  ? "/admin/register"
                  : "/admin/login"
              )
            }
          >

            {mode ===
              "login"
              ? "Register here"
              : "Login here"}

          </span>

        </p>

      </div>

    </div>
  );
};

/* ===========================
   STYLES
=========================== */
const styles = {

  page: {
    minHeight:
      "100vh",

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

    padding:
      "30px",

    borderRadius:
      "14px",

    width: "100%",

    maxWidth:
      "420px",

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
    padding:
      "12px",

    borderRadius:
      "8px",

    border:
      "1px solid #ccc",

    outline:
      "none",
  },

  button: {
    padding:
      "12px",

    border:
      "none",

    borderRadius:
      "8px",

    background:
      "#0d6efd",

    color:
      "#fff",

    cursor:
      "pointer",

    fontWeight:
      "600",
  },

};

export default AdminAuth;