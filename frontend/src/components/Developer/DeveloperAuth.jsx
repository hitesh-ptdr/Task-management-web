


import React, {
  useState,
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import axios from "../../api/axios";

const DeveloperAuth = () => {

  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  /* ===========================
     AUTO REDIRECT
  =========================== */
  useEffect(() => {

    const token =
      localStorage.getItem(
        "devToken"
      );

    if (
      token &&
      window.location.pathname ===
        "/developer/login"
    ) {

      navigate(
        "/developer/dashboard",
        {
          replace: true,
        }
      );
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
     LOGIN
  =========================== */
  const handleSubmit =
    async (e) => {

      e.preventDefault();
      setLoading(true);

      try {

        const res =
          await axios.post(
            "/developers/login",
            {
              email:
                form.email,

              password:
                form.password,
            }
          );

        /* SAVE TOKEN */
        localStorage.setItem(
          "devToken",
          res.data.token
        );

        /* SAVE DEV DATA */
        localStorage.setItem(
          "developer",
          JSON.stringify(
            res.data
          )
        );

        alert(
          "✅ Login Successful!"
        );

        navigate(
          "/developer/dashboard",
          {
            replace: true,
          }
        );

      } catch (err) {

        console.error(err);

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
    <div
      style={{
        minHeight:
          "100vh",

        display: "flex",

        justifyContent:
          "center",

        alignItems:
          "center",

        background:
          "#f8f9fa",
      }}
    >

      <div
        style={{
          background:
            "#fff",

          padding:
            "2rem",

          borderRadius:
            "10px",

          width: "100%",

          maxWidth:
            "400px",

          boxShadow:
            "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >

        <h2
          style={{
            textAlign:
              "center",

            marginBottom:
              "1.5rem",
          }}
        >
          Developer Login
        </h2>

        <form
          onSubmit={
            handleSubmit
          }

          style={{
            display: "flex",

            flexDirection:
              "column",

            gap: "1rem",
          }}
        >

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={
              handleChange
            }
            required
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
          />

          <button
            type="submit"

            style={{
              padding:
                "12px",

              border:
                "none",

              borderRadius:
                "6px",

              background:
                "#00cec9",

              color:
                "#fff",

              cursor:
                "pointer",

              opacity:
                loading
                  ? 0.7
                  : 1,
            }}
          >

            {loading
              ? "Processing..."
              : "🔑 Login"}

          </button>

        </form>

      </div>

    </div>
  );
};

export default DeveloperAuth;