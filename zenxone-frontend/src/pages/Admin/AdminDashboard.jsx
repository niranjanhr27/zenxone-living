import React, { useState, useEffect } from "react";
import {
  FaBuilding,
  FaUserGraduate,
  FaBed,
  FaRupeeSign,
  FaUserPlus,
  FaCalendarCheck,
  FaClock,
} from "react-icons/fa";
import { getDashboardStats } from "../../api/dashboardService";
import { toast } from "react-toastify";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getDashboardStats();
        setStats(res.data);
      } catch (error) {
        toast.error("Failed to load dashboard stats.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = stats
    ? [
        {
          icon: <FaBuilding />,
          label: "Total Properties",
          value: stats.totalProperties,
        },
        {
          icon: <FaUserGraduate />,
          label: "Total Students",
          value: stats.totalStudents,
        },
        {
          icon: <FaBed />,
          label: "Available Beds",
          value: stats.availableBeds,
        },
        { icon: <FaBed />, label: "Occupied Beds", value: stats.occupiedBeds },
        {
          icon: <FaRupeeSign />,
          label: "Total Revenue",
          value: `₹${stats.totalRevenue.toLocaleString("en-IN")}`,
        },
        {
          icon: <FaUserPlus />,
          label: "Today's Enquiries",
          value: stats.todaysEnquiries,
        },
        {
          icon: <FaCalendarCheck />,
          label: "Today's Visits",
          value: stats.todaysVisits,
        },
        {
          icon: <FaClock />,
          label: "Pending Followups",
          value: stats.pendingFollowups,
        },
      ]
    : [];

  return (
    <div className="zx-admin-dashboard">
      <h1>Dashboard</h1>
      <p className="zx-admin-subtitle">
        Welcome back! Here's what's happening at Zenxone Living.
      </p>

      {loading ? (
        <p>Loading stats...</p>
      ) : (
        <div className="zx-admin-stats-grid">
          {cards.map((card, i) => (
            <div key={i} className="zx-admin-stat-card">
              <div className="zx-admin-stat-icon">{card.icon}</div>
              <div>
                <span className="zx-admin-stat-value">{card.value}</span>
                <span className="zx-admin-stat-label">{card.label}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
