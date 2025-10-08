// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { IoMdTrophy } from "react-icons/io";

// const Navbar = () => {
//   return (
//     <nav style={styles.nav}>
//       <NavLink to="/" style={styles.logo}>
//         <IoMdTrophy size={28} />
//         <span>Task Manager</span>     
//       </NavLink>

//       <div style={styles.links}>
//         <NavLink
//           to="/admin"
//           style={({ isActive }) =>
//             isActive ? { ...styles.link, ...styles.active } : styles.link
//           }
//         >
//           Admin
//         </NavLink>
//         <NavLink
//           to="/developer"
//           style={({ isActive }) =>
//             isActive ? { ...styles.link, ...styles.active } : styles.link
//           }
//         >
//           Developer
//         </NavLink>
//       </div>
//     </nav>
//   );
// };

// const styles = {
//   nav: {
//     background: 'linear-gradient(90deg, #ff6f00, #ff8f00)',
//     padding: '1rem 2rem',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//   },
//   logo: {
//     display: 'flex',
//     alignItems: 'center',
//     color: '#fff',
//     textDecoration: 'none',
//     fontSize: '22px',
//     fontWeight: 'bold',
//     gap: '0.5rem',
//     textShadow: '1px 1px 4px rgba(0,0,0,0.3)',
//   },
//   links: {
//     display: 'flex',
//     gap: '1rem',
//   },
//   link: {
//     color: 'white',
//     textDecoration: 'none',
//     fontSize: '16px',
//     fontWeight: '500',
//     padding: '8px 16px',
//     borderRadius: '8px',
//     transition: '0.3s ease',
//   },
//   active: {
//     background: '#fff',
//     color: '#ff6f00',
//     fontWeight: 'bold',
//   },
// };

// export default Navbar;


import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoMdTrophy } from "react-icons/io";

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <NavLink to="/" style={styles.logo}>
        <IoMdTrophy size={28} />
        <span>Task Manager</span>
      </NavLink>

      <div style={styles.links}>
        <NavLink
          to="/admin/register"
          style={({ isActive }) =>
            isActive ? { ...styles.link, ...styles.active } : styles.link
          }
        >
          Admin
        </NavLink>
        <NavLink
          to="/developer"
          style={({ isActive }) =>
            isActive ? { ...styles.link, ...styles.active } : styles.link
          }
        >
          Developer
        </NavLink>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    background: 'linear-gradient(90deg, #ff6f00, #ff8f00)',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    position: "fixed",   // ✅ fix top
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '22px',
    fontWeight: 'bold',
    gap: '0.5rem',
    textShadow: '1px 1px 4px rgba(0,0,0,0.3)',
  },
  links: {
    display: 'flex',
    gap: '1rem',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    padding: '8px 16px',
    borderRadius: '8px',
    transition: '0.3s ease',
  },
  active: {
    background: '#fff',
    color: '#ff6f00',
    fontWeight: 'bold',
  }
};

export default Navbar;
