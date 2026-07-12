import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar/AdminSidebar";
import "./AdminLayout.css";

const AdminLayout = () => {
  return (
    <div className="zx-admin-layout">
      <AdminSidebar />
      <main className="zx-admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
