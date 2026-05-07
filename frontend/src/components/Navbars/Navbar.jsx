// // Navbar.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css";

// const Navbar = () => {
//   return (
//     <header className="navbar">

//       <Link to="/" className="nav-logo">
//         <span>Task</span>Manager.
//       </Link>

//       <nav className="nav-menu">
//         <Link to="/">Home</Link>
//         <Link to="/admin/login">Admin</Link>
//         <Link to="/developer/login">Developer</Link>
//         <Link to="/about">About</Link>
//       </nav>

//       <div className="nav-right">
//         <Link to="/admin/login" className="nav-btn">
//           Login
//         </Link>
//       </div>

//     </header>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {

const [menu,setMenu] = useState(false);

return (
<header className="navbar">

<Link to="/" className="nav-logo">
<span>Task</span>Manager
</Link>

<button
className="menu-toggle"
onClick={()=>setMenu(!menu)}
>
☰
</button>

<nav className={menu ? "nav-menu active" : "nav-menu"}>

<Link to="/" onClick={()=>setMenu(false)}>Home</Link>
<Link to="/admin/login" onClick={()=>setMenu(false)}>Admin</Link>
<Link to="/developer/login" onClick={()=>setMenu(false)}>Developer</Link>
<Link to="/about" onClick={()=>setMenu(false)}>About</Link>

<Link
to="/admin/login"
className="nav-btn"
onClick={()=>setMenu(false)}
>
Login
</Link>

</nav>

</header>
);
};

export default Navbar;