import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaCalendarCheck,
  FaUserGraduate,
  FaClipboardList,
  FaRupeeSign,
  FaBuilding,
  FaBed,
  FaSignOutAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("zx-user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("zx-auth-token");
    localStorage.removeItem("zx-user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const links = [
    { to: "/admin", icon: <FaTachometerAlt />, label: "Dashboard", end: true },
    { to: "/admin/properties", icon: <FaBuilding />, label: "Properties" },
    { to: "/admin/rooms", icon: <FaBed />, label: "Rooms" },
    { to: "/admin/leads", icon: <FaUsers />, label: "Leads" },
    { to: "/admin/visits", icon: <FaCalendarCheck />, label: "Visits" },
    { to: "/admin/students", icon: <FaUserGraduate />, label: "Students" },
    { to: "/admin/bookings", icon: <FaClipboardList />, label: "Bookings" },
    { to: "/admin/payments", icon: <FaRupeeSign />, label: "Payments" },
  ];

  return (
    <aside className="zx-admin-sidebar">
      <div className="zx-admin-sidebar-header">
        <span className="zx-admin-logo-zx">ZX</span>
        <div>
          <strong>ZENXONE</strong>
          <small>Admin Panel</small>
        </div>
      </div>

      <div className="zx-admin-user">
        <div className="zx-admin-avatar">{user.fullName?.charAt(0) || "A"}</div>
        <div>
          <strong>{user.fullName || "Admin"}</strong>
          <small>{user.role || "STAFF"}</small>
        </div>
      </div>

      <nav className="zx-admin-nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `zx-admin-nav-link ${isActive ? "zx-admin-nav-active" : ""}`
            }
          >
            {link.icon} <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <button className="zx-admin-logout" onClick={handleLogout}>
        <FaSignOutAlt /> Logout
      </button>
    </aside>
  );
};

export default AdminSidebar;
