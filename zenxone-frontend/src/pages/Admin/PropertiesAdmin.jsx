import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import {
  getAllPropertiesAdmin,
  createProperty,
  updateProperty,
  deleteProperty,
} from "../../api/adminPropertyService";
import { toast } from "react-toastify";
import "./AdminTables.css";

const PropertiesAdmin = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    type: "AMAZON",
    address: "",
    city: "",
    state: "",
    pincode: "",
    description: "",
  });

  const fetchProperties = async () => {
    try {
      const res = await getAllPropertiesAdmin();
      setProperties(res.data);
    } catch (error) {
      toast.error("Failed to load properties.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      type: "AMAZON",
      address: "",
      city: "",
      state: "",
      pincode: "",
      description: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  const openEditForm = (property) => {
    setFormData({
      name: property.name || "",
      type: property.type || "AMAZON",
      address: property.address || "",
      city: property.city || "",
      state: property.state || "",
      pincode: property.pincode || "",
      description: property.description || "",
    });
    setEditingId(property.id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.type)
      return toast.error("Please fill required fields");

    setSubmitting(true);
    try {
      if (editingId) {
        await updateProperty(editingId, formData);
        toast.success("Property updated successfully");
      } else {
        await createProperty(formData);
        toast.success("Property created successfully");
      }
      resetForm();
      fetchProperties();
    } catch (error) {
      toast.error(
        editingId ? "Failed to update property" : "Failed to create property",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete property "${name}"? This will deactivate it.`))
      return;
    try {
      await deleteProperty(id);
      toast.success("Property deactivated successfully");
      fetchProperties();
    } catch (error) {
      toast.error("Failed to delete property");
    }
  };

  return (
    <div className="zx-admin-table-page">
      <div className="zx-admin-page-header">
        <div>
          <h1>Properties</h1>
          <p className="zx-admin-subtitle">Manage your hostel/PG properties.</p>
        </div>
        <button
          className="btn-brand"
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
        >
          {showForm ? "Cancel" : "+ Add Property"}
        </button>
      </div>

      {showForm && (
        <form className="zx-admin-form" onSubmit={handleSubmit}>
          <div className="zx-admin-form-row">
            <div className="zx-form-group">
              <label>Property Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Amazon Property"
                required
              />
            </div>
            <div className="zx-form-group">
              <label>Type</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="AMAZON">Amazon</option>
                <option value="BHK">BHK</option>
              </select>
            </div>
          </div>

          <div className="zx-form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="zx-admin-form-row">
            <div className="zx-form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="zx-form-group">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="zx-form-group">
            <label>Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
            />
          </div>

          <div className="zx-form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            ></textarea>
          </div>

          <button type="submit" className="btn-brand" disabled={submitting}>
            {submitting
              ? "Saving..."
              : editingId
                ? "Update Property"
                : "Create Property"}
          </button>
        </form>
      )}

      {loading ? (
        <p>Loading properties...</p>
      ) : (
        <div className="zx-admin-table-wrapper">
          <table className="zx-admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>City</th>
                <th>Total Rooms</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property.id}>
                  <td>{property.name}</td>
                  <td>{property.type}</td>
                  <td>{property.city}</td>
                  <td>{property.totalRooms}</td>
                  <td>{property.isActive ? "Active" : "Inactive"}</td>
                  <td>
                    <div className="zx-admin-actions">
                      <button
                        className="zx-admin-icon-btn"
                        onClick={() => openEditForm(property)}
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="zx-admin-icon-btn zx-admin-icon-btn-danger"
                        onClick={() => handleDelete(property.id, property.name)}
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

export default PropertiesAdmin;
