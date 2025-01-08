import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/3d@4x.png";
import "../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <nav className="nav-links">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/CategoryList"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Category
        </NavLink>
        <NavLink
          to="/admin/ItemList"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Items
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
