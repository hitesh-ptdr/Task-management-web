import React, {
  useEffect,
  useState,
} from "react";

import axios from "../../api/axios";

const AdminAllDevelopers = () => {

  const [developers, setDevelopers] =
    useState([]);

  /* ===========================
     FETCH DEVELOPERS
  =========================== */
  useEffect(() => {
    fetchDevelopers();
  }, []);

  const fetchDevelopers =
    async () => {

      try {

        // ✅ UPDATED TOKEN
     

        const res =
          await axios.get(
            "/developers",
            {
           
            }
          );

        setDevelopers(
          res.data
        );

      } catch (err) {

        console.error(
          "Error fetching developers:",
          err.response?.data ||
            err
        );

        alert(
          "Failed to fetch developers"
        );
      }
    };

  /* ===========================
     DELETE DEVELOPER
  =========================== */
  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete?"
        );

      if (!confirmDelete)
        return;

      try {

        // ✅ UPDATED TOKEN
        const token =
          localStorage.getItem(
            "adminToken"
          );

        await axios.delete(
          `/developers/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        // UI UPDATE
        setDevelopers(
          (prev) =>
            prev.filter(
              (dev) =>
                dev._id !== id
            )
        );

        alert(
          "Developer deleted successfully"
        );

      } catch (err) {

        console.error(
          "Error deleting developer:",
          err.response?.data ||
            err
        );

        alert(
          "Failed to delete developer"
        );
      }
    };

  return (
    <div
      className="container"
      style={{
        padding: "2rem",
        fontFamily:
          "'Poppins', sans-serif",
      }}
    >

      <h2
        style={{
          marginBottom:
            "1rem",
        }}
      >
        All Developers
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse:
            "collapse",
        }}
      >

        <thead>

          <tr
            style={{
              background:
                "#f1f1f1",
            }}
          >

            <th style={thStyle}>
              S.No
            </th>

            <th style={thStyle}>
              Name
            </th>

            <th style={thStyle}>
              Email
            </th>

            <th style={thStyle}>
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {developers.map(
            (dev, idx) => (

              <tr
                key={dev._id}
              >

                <td style={tdStyle}>
                  {idx + 1}
                </td>

                <td style={tdStyle}>
                  {dev.name}
                </td>

                <td style={tdStyle}>
                  {dev.email}
                </td>

                <td style={tdStyle}>

                  <button
                    onClick={() =>
                      handleDelete(
                        dev._id
                      )
                    }

                    style={{
                      padding:
                        "6px 10px",

                      background:
                        "red",

                      color:
                        "#fff",

                      border:
                        "none",

                      borderRadius:
                        "4px",

                      cursor:
                        "pointer",
                    }}
                  >
                    Delete
                  </button>

                </td>

              </tr>
            )
          )}

        </tbody>

      </table>

    </div>
  );
};

/* ===========================
   STYLES
=========================== */

const thStyle = {
  border:
    "1px solid #ddd",

  padding: "8px",
};

const tdStyle = {
  border:
    "1px solid #ddd",

  padding: "8px",
};

export default AdminAllDevelopers;