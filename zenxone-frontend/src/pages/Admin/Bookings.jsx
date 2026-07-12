import React, { useState, useEffect } from "react";
import {
  getAllBookings,
  updateBookingStatus,
} from "../../api/adminBookingService";
import { toast } from "react-toastify";
import "./AdminTables.css";

const statusColors = {
  PENDING: "#f59e0b",
  CONFIRMED: "#22c55e",
  CANCELLED: "#ef4444",
  COMPLETED: "#3b82f6",
};

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await getAllBookings();
      setBookings(res.data);
    } catch (error) {
      toast.error("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateBookingStatus(id, newStatus);
      toast.success("Booking status updated");
      fetchBookings();
    } catch (error) {
      toast.error("Failed to update booking status");
    }
  };

  return (
    <div className="zx-admin-table-page">
      <h1>Bookings</h1>
      <p className="zx-admin-subtitle">
        All confirmed bookings and their payment details.
      </p>

      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="zx-admin-table-wrapper">
          <table className="zx-admin-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Student</th>
                <th>Property</th>
                <th>Room / Bed</th>
                <th>Monthly Rent</th>
                <th>Advance Paid</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.bookingId}</td>
                  <td>{booking.studentName}</td>
                  <td>{booking.propertyName}</td>
                  <td>
                    {booking.roomNumber} - {booking.bedNumber}
                  </td>
                  <td>₹{booking.monthlyRent.toLocaleString("en-IN")}</td>
                  <td>₹{booking.advancePayment.toLocaleString("en-IN")}</td>
                  <td>
                    <select
                      value={booking.status}
                      onChange={(e) =>
                        handleStatusChange(booking.id, e.target.value)
                      }
                      className="zx-admin-status-select"
                      style={{ borderColor: statusColors[booking.status] }}
                    >
                      <option value="PENDING">Pending</option>
                      <option value="CONFIRMED">Confirmed</option>
                      <option value="CANCELLED">Cancelled</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Bookings;
