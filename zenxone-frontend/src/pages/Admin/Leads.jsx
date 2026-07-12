import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import {
  getAllLeads,
  updateLeadStatus,
  updateLead,
  deleteLead,
} from "../../api/adminLeadService";
import { toast } from "react-toastify";
import "./AdminTables.css";

const statusColors = {
  NEW: "#3b82f6",
  INTERESTED: "#f59e0b",
  VISIT_SCHEDULED: "#8b5cf6",
  BOOKED: "#22c55e",
  REJECTED: "#ef4444",
  LOST: "#6b7280",
};

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingLead, setEditingLead] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    leadName: "",
    parentName: "",
    phone: "",
    email: "",
    college: "",
    course: "",
    budget: "",
    remarks: "",
  });

  const fetchLeads = async () => {
    try {
      const res = await getAllLeads();
      setLeads(res.data);
    } catch (error) {
      toast.error("Failed to load leads.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateLeadStatus(id, newStatus, null);
      toast.success("Lead status updated");
      fetchLeads();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openEditModal = (lead) => {
    setFormData({
      leadName: lead.leadName || "",
      parentName: lead.parentName || "",
      phone: lead.phone || "",
      email: lead.email || "",
      college: lead.college || "",
      course: lead.course || "",
      budget: lead.budget || "",
      remarks: lead.remarks || "",
    });
    setEditingLead(lead);
  };

  const closeEditModal = () => setEditingLead(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await updateLead(editingLead.id, {
        ...formData,
        budget: formData.budget ? parseFloat(formData.budget) : null,
      });
      toast.success("Lead updated successfully");
      closeEditModal();
      fetchLeads();
    } catch (error) {
      toast.error("Failed to update lead");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete lead "${name}"? This cannot be undone.`))
      return;
    try {
      await deleteLead(id);
      toast.success("Lead deleted successfully");
      fetchLeads();
    } catch (error) {
      toast.error("Failed to delete lead");
    }
  };

  return (
    <div className="zx-admin-table-page">
      <h1>Leads</h1>
      <p className="zx-admin-subtitle">
        Manage enquiries submitted through the website and walk-ins.
      </p>

      {loading ? (
        <p>Loading leads...</p>
      ) : leads.length === 0 ? (
        <p>No leads yet.</p>
      ) : (
        <div className="zx-admin-table-wrapper">
          <table className="zx-admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Property</th>
                <th>Source</th>
                <th>Status</th>
                <th>Remarks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.leadName}</td>
                  <td>{lead.phone}</td>
                  <td>{lead.email || "-"}</td>
                  <td>{lead.propertyName || "-"}</td>
                  <td>{lead.leadSource}</td>
                  <td>
                    <select
                      value={lead.status}
                      onChange={(e) =>
                        handleStatusChange(lead.id, e.target.value)
                      }
                      className="zx-admin-status-select"
                      style={{ borderColor: statusColors[lead.status] }}
                    >
                      <option value="NEW">New</option>
                      <option value="INTERESTED">Interested</option>
                      <option value="VISIT_SCHEDULED">Visit Scheduled</option>
                      <option value="BOOKED">Booked</option>
                      <option value="REJECTED">Rejected</option>
                      <option value="LOST">Lost</option>
                    </select>
                  </td>
                  <td>{lead.remarks || "-"}</td>
                  <td>
                    <div className="zx-admin-actions">
                      <button
                        className="zx-admin-icon-btn"
                        onClick={() => openEditModal(lead)}
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="zx-admin-icon-btn zx-admin-icon-btn-danger"
                        onClick={() => handleDelete(lead.id, lead.leadName)}
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

      {editingLead && (
        <div className="zx-admin-modal-overlay" onClick={closeEditModal}>
          <div className="zx-admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="zx-admin-modal-header">
              <h2>Edit Lead</h2>
              <button className="zx-admin-icon-btn" onClick={closeEditModal}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="zx-admin-form">
              <div className="zx-admin-form-row">
                <div className="zx-form-group">
                  <label>Lead Name</label>
                  <input
                    type="text"
                    name="leadName"
                    value={formData.leadName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="zx-form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="zx-admin-form-row">
                <div className="zx-form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="zx-form-group">
                  <label>Parent Name</label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="zx-admin-form-row">
                <div className="zx-form-group">
                  <label>College</label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                  />
                </div>
                <div className="zx-form-group">
                  <label>Course</label>
                  <input
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="zx-form-group">
                <label>Budget (₹)</label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                />
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

export default Leads;
