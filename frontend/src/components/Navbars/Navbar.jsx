

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

<div className="nav-actions">

<Link
to="/admin/login"
className="nav-btn"
onClick={()=>setMenu(false)}
>
Login
</Link>

<Link
to="/admin/register"
className="nav-btn register-btn"
onClick={()=>setMenu(false)}
>
Register
</Link>

</div>

</nav>

</header>
);
};

export default Navbar;