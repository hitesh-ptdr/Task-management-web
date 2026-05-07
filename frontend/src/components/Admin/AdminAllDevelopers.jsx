// import React, {
//   useEffect,
//   useState,
// } from "react";

// import axios from "../../api/axios";

// const AdminAllDevelopers = () => {

//   const [developers, setDevelopers] =
//     useState([]);

//   /* ===========================
//      FETCH DEVELOPERS
//   =========================== */
//   useEffect(() => {
//     fetchDevelopers();
//   }, []);

//   const fetchDevelopers =
//     async () => {

//       try {

//         // ✅ UPDATED TOKEN
     

//         const res =
//           await axios.get(
//             "/developers",
//             {
           
//             }
//           );

//         setDevelopers(
//           res.data
//         );

//       } catch (err) {

//         console.error(
//           "Error fetching developers:",
//           err.response?.data ||
//             err
//         );

//         alert(
//           "Failed to fetch developers"
//         );
//       }
//     };

//   /* ===========================
//      DELETE DEVELOPER
//   =========================== */
//   const handleDelete =
//     async (id) => {

//       const confirmDelete =
//         window.confirm(
//           "Are you sure you want to delete?"
//         );

//       if (!confirmDelete)
//         return;

//       try {

//         // ✅ UPDATED TOKEN
//         const token =
//           localStorage.getItem(
//             "adminToken"
//           );

//         await axios.delete(
//           `/developers/${id}`,
//           {
//             headers: {
//               Authorization:
//                 `Bearer ${token}`,
//             },
//           }
//         );

//         // UI UPDATE
//         setDevelopers(
//           (prev) =>
//             prev.filter(
//               (dev) =>
//                 dev._id !== id
//             )
//         );

//         alert(
//           "Developer deleted successfully"
//         );

//       } catch (err) {

//         console.error(
//           "Error deleting developer:",
//           err.response?.data ||
//             err
//         );

//         alert(
//           "Failed to delete developer"
//         );
//       }
//     };

//   return (
//     <div
//       className="container"
//       style={{
//         padding: "2rem",
//         fontFamily:
//           "'Poppins', sans-serif",
//       }}
//     >

//       <h2
//         style={{
//           marginBottom:
//             "1rem",
//         }}
//       >
//         All Developers
//       </h2>

//       <table
//         style={{
//           width: "100%",
//           borderCollapse:
//             "collapse",
//         }}
//       >

//         <thead>

//           <tr
//             style={{
//               background:
//                 "#f1f1f1",
//             }}
//           >

//             <th style={thStyle}>
//               S.No
//             </th>

//             <th style={thStyle}>
//               Name
//             </th>

//             <th style={thStyle}>
//               Email
//             </th>

//             <th style={thStyle}>
//               Action
//             </th>

//           </tr>

//         </thead>

//         <tbody>

//           {developers.map(
//             (dev, idx) => (

//               <tr
//                 key={dev._id}
//               >

//                 <td style={tdStyle}>
//                   {idx + 1}
//                 </td>

//                 <td style={tdStyle}>
//                   {dev.name}
//                 </td>

//                 <td style={tdStyle}>
//                   {dev.email}
//                 </td>

//                 <td style={tdStyle}>

//                   <button
//                     onClick={() =>
//                       handleDelete(
//                         dev._id
//                       )
//                     }

//                     style={{
//                       padding:
//                         "6px 10px",

//                       background:
//                         "red",

//                       color:
//                         "#fff",

//                       border:
//                         "none",

//                       borderRadius:
//                         "4px",

//                       cursor:
//                         "pointer",
//                     }}
//                   >
//                     Delete
//                   </button>

//                 </td>

//               </tr>
//             )
//           )}

//         </tbody>

//       </table>

//     </div>
//   );
// };

// /* ===========================
//    STYLES
// =========================== */

// const thStyle = {
//   border:
//     "1px solid #ddd",

//   padding: "8px",
// };

// const tdStyle = {
//   border:
//     "1px solid #ddd",

//   padding: "8px",
// };

// export default AdminAllDevelopers;

import React, {
  useEffect,
  useState,
} from "react";

import axios from "../../api/axios";

const AdminAllDevelopers = () => {

  const [developers,
    setDevelopers] =
    useState([]);

  /* FETCH */
  useEffect(() => {
    fetchDevelopers();
  }, []);

  const fetchDevelopers =
    async () => {

      try {

        const res =
          await axios.get(
            "/developers"
          );

        setDevelopers(
          res.data
        );

      } catch (err) {

        console.log(err);

        alert(
          "Failed to fetch developers"
        );
      }
    };

  /* DELETE */
  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete developer?"
        );

      if (!confirmDelete)
        return;

      try {

        await axios.delete(
          `/developers/${id}`
        );

        setDevelopers(
          (prev) =>
            prev.filter(
              (dev) =>
                dev._id !== id
            )
        );

      } catch (err) {

        console.log(err);

        alert(
          "Delete failed"
        );
      }
    };

  return (

    <div style={styles.page}>

      <div style={styles.header}>

        <h1>
          All Developers
        </h1>

        <p>
          Manage all registered developers
        </p>

      </div>

      {/* MOBILE CARD VIEW */}
      <div className="mobile-cards">

        {developers.map(
          (
            dev,
            idx
          ) => (

            <div
              key={dev._id}
              style={
                styles.card
              }
            >

              <h3>
                {dev.name}
              </h3>

              <p>
                {dev.email}
              </p>

              <button
                onClick={() =>
                  handleDelete(
                    dev._id
                  )
                }

                style={
                  styles.deleteBtn
                }
              >
                Delete
              </button>

            </div>
          )
        )}

      </div>

      {/* DESKTOP TABLE */}
      <div style={styles.tableWrap}>

        <table style={styles.table}>

          <thead>

            <tr>

              <th>
                #
              </th>

              <th>
                Name
              </th>

              <th>
                Email
              </th>

              <th>
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {developers.map(
              (
                dev,
                idx
              ) => (

                <tr
                  key={
                    dev._id
                  }
                >

                  <td>
                    {idx + 1}
                  </td>

                  <td>
                    {dev.name}
                  </td>

                  <td>
                    {dev.email}
                  </td>

                  <td>

                    <button
                      onClick={() =>
                        handleDelete(
                          dev._id
                        )
                      }

                      style={
                        styles.deleteBtn
                      }
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

      {/* CSS */}
      <style>
        {`

        .mobile-cards{
          display:none;
        }

        @media(max-width:768px){

          .mobile-cards{
            display:flex;
            flex-direction:column;
            gap:16px;
          }

          table{
            display:none;
          }
        }

      `}
      </style>

    </div>
  );
};

/* STYLES */
const styles = {

  page: {
    padding: "20px",
    width: "100%",
  },

  header: {
    marginBottom: "20px",
  },

  tableWrap: {
    width: "100%",
    overflowX: "auto",
    background: "#fff",
    borderRadius: "14px",
    boxShadow:
      "0 5px 20px rgba(0,0,0,.05)",
  },

  table: {
    width: "100%",
    borderCollapse:
      "collapse",
    minWidth: "700px",
  },

  card: {
    background: "#fff",
    padding: "18px",
    borderRadius: "14px",
    boxShadow:
      "0 5px 15px rgba(0,0,0,.05)",
  },

  deleteBtn: {
    border: "none",
    background: "#ef4444",
    color: "#fff",
    padding:
      "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "12px",
  },
};

export default AdminAllDevelopers;