import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../admin/components/Dashboard";
import AddCategory from "../admin/components/AddCategory";
import AddItems from "../admin/components/AddItems";
import AdminLayout from "../admin/components/AdminLayout";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="add-category" element={<AddCategory />} />
        <Route path="add-items" element={<AddItems />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
