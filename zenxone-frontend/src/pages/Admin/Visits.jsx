import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import apiClient from "../../api/axiosConfig";
import { toast } from "react-toastify";
import "./AdminTables.css";

const statusColors = {
  SCHEDULED: "#3b82f6",
  COMPLETED: "#22c55e",
  CANCELLED: "#ef4444",
  NO_SHOW: "#6b7280",
};

const Visits = () => {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingVisit, setEditingVisit] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    visitDate: "",
    visitTime: "",
    remarks: "",
  });

  const fetchVisits = async () => {
    try {
      const res = await apiClient.get("/visits");
      setVisits(res.data.data);
    } catch (error) {
      toast.error("Failed to load visits.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisits();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await apiClient.patch(`/visits/${id}/status?status=${newStatus}`);
      toast.success("Visit status updated");
      fetchVisits();
    } catch (error) {
      toast.error("Failed to update visit status");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openEditModal = (visit) => {
    setFormData({
      visitDate: visit.visitDate || "",
      visitTime: visit.visitTime || "",
      remarks: visit.remarks || "",
    });
    setEditingVisit(visit);
  };

  const closeEditModal = () => setEditingVisit(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiClient.put(`/visits/${editingVisit.id}`, {
        leadId: editingVisit.leadId,
        visitDate: formData.visitDate,
        visitTime: formData.visitTime,
        remarks: formData.remarks,
      });
      toast.success("Visit updated successfully");
      closeEditModal();
      fetchVisits();
    } catch (error) {
      toast.error("Failed to update visit");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete visit for "${name}"? This cannot be undone.`))
      return;
    try {
      await apiClient.delete(`/visits/${id}`);
      toast.success("Visit deleted successfully");
      fetchVisits();
    } catch (error) {
      toast.error("Failed to delete visit");
    }
  };

  return (
    <div className="zx-admin-table-page">
      <h1>Visits</h1>
      <p className="zx-admin-subtitle">
        Track scheduled property visits from leads.
      </p>

      {loading ? (
        <p>Loading visits...</p>
      ) : visits.length === 0 ? (
        <p>No visits scheduled yet.</p>
      ) : (
        <div className="zx-admin-table-wrapper">
          <table className="zx-admin-table">
            <thead>
              <tr>
                <th>Lead Name</th>
                <th>Phone</th>
                <th>Visit Date</th>
                <th>Visit Time</th>
                <th>Status</th>
                <th>Remarks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visits.map((visit) => (
                <tr key={visit.id}>
                  <td>{visit.leadName}</td>
                  <td>{visit.leadPhone}</td>
                  <td>{visit.visitDate}</td>
                  <td>{visit.visitTime || "-"}</td>
                  <td>
                    <select
                      value={visit.status}
                      onChange={(e) =>
                        handleStatusChange(visit.id, e.target.value)
                      }
                      className="zx-admin-status-select"
                      style={{ borderColor: statusColors[visit.status] }}
                    >
                      <option value="SCHEDULED">Scheduled</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="CANCELLED">Cancelled</option>
                      <option value="NO_SHOW">No Show</option>
                    </select>
                  </td>
                  <td>{visit.remarks || "-"}</td>
                  <td>
                    <div className="zx-admin-actions">
                      <button
                        className="zx-admin-icon-btn"
                        onClick={() => openEditModal(visit)}
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="zx-admin-icon-btn zx-admin-icon-btn-danger"
                        onClick={() => handleDelete(visit.id, visit.leadName)}
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

      {editingVisit && (
        <div className="zx-admin-modal-overlay" onClick={closeEditModal}>
          <div className="zx-admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="zx-admin-modal-header">
              <h2>Edit Visit</h2>
              <button className="zx-admin-icon-btn" onClick={closeEditModal}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="zx-admin-form">
              <div className="zx-admin-form-row">
                <div className="zx-form-group">
                  <label>Visit Date</label>
                  <input
                    type="date"
                    name="visitDate"
                    value={formData.visitDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="zx-form-group">
                  <label>Visit Time</label>
                  <input
                    type="time"
                    name="visitTime"
                    value={formData.visitTime}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="zx-form-group">
                <label>Remarks</label>
                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  rows="3"
                ></textarea>
              </div>

              <button type="submit" className="btn-brand" disabled={submitting}>
                {submitting ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Visits;
