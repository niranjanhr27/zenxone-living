import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  getAllPayments,
  recordPayment,
  updatePayment,
  deletePayment,
} from "../../api/adminPaymentService";
import { getAllBookings } from "../../api/adminBookingService";
import { toast } from "react-toastify";
import "./AdminTables.css";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    bookingId: "",
    amount: "",
    paymentType: "MONTHLY_RENT",
    paymentMethod: "UPI",
    transactionId: "",
  });

  const fetchData = async () => {
    try {
      const [paymentsRes, bookingsRes] = await Promise.all([
        getAllPayments(),
        getAllBookings(),
      ]);
      setPayments(paymentsRes.data);
      setBookings(bookingsRes.data);
    } catch (error) {
      toast.error("Failed to load payments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      bookingId: "",
      amount: "",
      paymentType: "MONTHLY_RENT",
      paymentMethod: "UPI",
      transactionId: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEditClick = (payment) => {
    setFormData({
      bookingId: payment.bookingId,
      amount: payment.amount,
      paymentType: payment.paymentType,
      paymentMethod: payment.paymentMethod,
      transactionId: payment.transactionId || "",
    });
    setEditingId(payment.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this payment record? This cannot be undone.",
      )
    )
      return;
    try {
      await deletePayment(id);
      toast.success("Payment deleted successfully");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete payment");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.bookingId || !formData.amount) {
      return toast.error("Please select a booking and enter an amount");
    }

    setSubmitting(true);
    try {
      const payload = {
        bookingId: parseInt(formData.bookingId),
        amount: parseFloat(formData.amount),
        paymentType: formData.paymentType,
        paymentMethod: formData.paymentMethod,
        transactionId: formData.transactionId || null,
      };

      if (editingId) {
        await updatePayment(editingId, payload);
        toast.success("Payment updated successfully");
      } else {
        await recordPayment(payload);
        toast.success("Payment recorded successfully");
      }

      resetForm();
      fetchData();
    } catch (error) {
      toast.error(
        editingId ? "Failed to update payment" : "Failed to record payment",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="zx-admin-table-page">
      <div className="zx-admin-page-header">
        <div>
          <h1>Payments</h1>
          <p className="zx-admin-subtitle">
            Record and track all student payments.
          </p>
        </div>
        <button
          className="btn-brand"
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
        >
          {showForm ? "Cancel" : "+ Record Payment"}
        </button>
      </div>

      {showForm && (
        <form className="zx-admin-form" onSubmit={handleSubmit}>
          <div className="zx-admin-form-row">
            <div className="zx-form-group">
              <label>Booking</label>
              <select
                name="bookingId"
                value={formData.bookingId}
                onChange={handleChange}
              >
                <option value="">Select a booking</option>
                {bookings.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.bookingId} — {b.studentName} ({b.roomNumber})
                  </option>
                ))}
              </select>
            </div>

            <div className="zx-form-group">
              <label>Amount (₹)</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="e.g., 18000"
              />
            </div>
          </div>

          <div className="zx-admin-form-row">
            <div className="zx-form-group">
              <label>Payment Type</label>
              <select
                name="paymentType"
                value={formData.paymentType}
                onChange={handleChange}
              >
                <option value="MONTHLY_RENT">Monthly Rent</option>
                <option value="SECURITY_DEPOSIT">Security Deposit</option>
                <option value="PENALTY">Penalty</option>
                <option value="ADVANCE">Advance</option>
              </select>
            </div>

            <div className="zx-form-group">
              <label>Payment Method</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                <option value="UPI">UPI</option>
                <option value="CASH">Cash</option>
                <option value="BANK_TRANSFER">Bank Transfer</option>
              </select>
            </div>
          </div>

          <div className="zx-form-group">
            <label>Transaction ID (Optional)</label>
            <input
              type="text"
              name="transactionId"
              value={formData.transactionId}
              onChange={handleChange}
              placeholder="UPI ref / transaction number"
            />
          </div>

          <button type="submit" className="btn-brand" disabled={submitting}>
            {submitting
              ? "Saving..."
              : editingId
                ? "Update Payment"
                : "Record Payment"}
          </button>
        </form>
      )}

      {loading ? (
        <p>Loading payments...</p>
      ) : payments.length === 0 ? (
        <p>No payments recorded yet.</p>
      ) : (
        <div className="zx-admin-table-wrapper">
          <table className="zx-admin-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Student</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Method</th>
                <th>Transaction ID</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.bookingReferenceId}</td>
                  <td>{payment.studentName}</td>
                  <td>₹{payment.amount.toLocaleString("en-IN")}</td>
                  <td>{payment.paymentType}</td>
                  <td>{payment.paymentMethod}</td>
                  <td>{payment.transactionId || "-"}</td>
                  <td>{payment.status}</td>
                  <td>
                    {new Date(payment.createdAt).toLocaleDateString("en-IN")}
                  </td>
                  <td>
                    <div className="zx-admin-actions">
                      <button
                        className="zx-admin-icon-btn"
                        onClick={() => handleEditClick(payment)}
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="zx-admin-icon-btn zx-admin-icon-btn-danger"
                        onClick={() => handleDelete(payment.id)}
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
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

export default Payments;
