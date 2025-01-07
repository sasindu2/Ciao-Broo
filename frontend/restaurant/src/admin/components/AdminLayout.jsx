import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../styles/AdminLayout.css";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
