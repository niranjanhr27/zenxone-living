import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  getAllRoomsAdmin,
  createRoom,
  updateRoom,
  updateRoomMaintenance,
  deleteRoom,
} from "../../api/adminRoomService";
import { getAllPropertiesAdmin } from "../../api/adminPropertyService";
import { toast } from "react-toastify";
import "./AdminTables.css";

const RoomsAdmin = () => {
  const [rooms, setRooms] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    propertyId: "",
    roomNumber: "",
    roomType: "",
    totalBeds: "",
    pricePerBed: "",
  });

  const fetchData = async () => {
    try {
      const [roomsRes, propertiesRes] = await Promise.all([
        getAllRoomsAdmin(),
        getAllPropertiesAdmin(),
      ]);
      setRooms(roomsRes.data);
      setProperties(propertiesRes.data);
    } catch (error) {
      toast.error("Failed to load rooms.");
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
      propertyId: "",
      roomNumber: "",
      roomType: "",
      totalBeds: "",
      pricePerBed: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  const openEditForm = (room) => {
    setFormData({
      propertyId: room.propertyId,
      roomNumber: room.roomNumber || "",
      roomType: room.roomType || "",
      totalBeds: room.totalBeds || "",
      pricePerBed: room.pricePerBed || "",
    });
    setEditingId(room.id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.propertyId ||
      !formData.roomNumber ||
      !formData.roomType ||
      !formData.totalBeds ||
      !formData.pricePerBed
    ) {
      return toast.error("Please fill all fields");
    }

    setSubmitting(true);
    try {
      const payload = {
        propertyId: parseInt(formData.propertyId),
        roomNumber: formData.roomNumber,
        roomType: formData.roomType,
        totalBeds: parseInt(formData.totalBeds),
        pricePerBed: parseFloat(formData.pricePerBed),
      };

      if (editingId) {
        await updateRoom(editingId, payload);
        toast.success("Room updated successfully");
      } else {
        await createRoom(payload);
        toast.success("Room created successfully (beds auto-generated)");
      }
      resetForm();
      fetchData();
    } catch (error) {
      toast.error(
        editingId ? "Failed to update room" : "Failed to create room",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleMaintenanceChange = async (id, status) => {
    try {
      await updateRoomMaintenance(id, status);
      toast.success("Maintenance status updated");
      fetchData();
    } catch (error) {
      toast.error("Failed to update maintenance status");
    }
  };

  const handleDelete = async (id, roomNumber) => {
    if (
      !window.confirm(
        `Delete room "${roomNumber}"? This will also remove its beds.`,
      )
    )
      return;
    try {
      await deleteRoom(id);
      toast.success("Room deleted successfully");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete room. It may have active bookings.");
    }
  };

  return (
    <div className="zx-admin-table-page">
      <div className="zx-admin-page-header">
        <div>
          <h1>Rooms</h1>
          <p className="zx-admin-subtitle">
            Manage rooms and bed inventory across all properties.
          </p>
        </div>
        <button
          className="btn-brand"
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
        >
          {showForm ? "Cancel" : "+ Add Room"}
        </button>
      </div>

      {showForm && (
        <form className="zx-admin-form" onSubmit={handleSubmit}>
          <div className="zx-admin-form-row">
            <div className="zx-form-group">
              <label>Property</label>
              <select
                name="propertyId"
                value={formData.propertyId}
                onChange={handleChange}
                disabled={!!editingId}
              >
                <option value="">Select property</option>
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="zx-form-group">
              <label>Room Number</label>
              <input
                type="text"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                placeholder="e.g., 101"
              />
            </div>
          </div>

          <div className="zx-admin-form-row">
            <div className="zx-form-group">
              <label>Room Type</label>
              <input
                type="text"
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                placeholder="e.g., 1 BHK, 2 Sharing"
              />
            </div>
            <div className="zx-form-group">
              <label>Total Beds</label>
              <input
                type="number"
                name="totalBeds"
                value={formData.totalBeds}
                onChange={handleChange}
                disabled={!!editingId}
              />
            </div>
          </div>

          <div className="zx-form-group">
            <label>Price Per Bed (₹/month)</label>
            <input
              type="number"
              name="pricePerBed"
              value={formData.pricePerBed}
              onChange={handleChange}
            />
          </div>

          {!editingId && (
            <p style={{ fontSize: "12px", opacity: 0.7 }}>
              Beds will be auto-generated based on the total beds entered.
            </p>
          )}

          <button type="submit" className="btn-brand" disabled={submitting}>
            {submitting
              ? "Saving..."
              : editingId
                ? "Update Room"
                : "Create Room"}
          </button>
        </form>
      )}

      {loading ? (
        <p>Loading rooms...</p>
      ) : (
        <div className="zx-admin-table-wrapper">
          <table className="zx-admin-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Room No.</th>
                <th>Type</th>
                <th>Total Beds</th>
                <th>Available</th>
                <th>Price/Bed</th>
                <th>Maintenance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id}>
                  <td>{room.propertyName}</td>
                  <td>{room.roomNumber}</td>
                  <td>{room.roomType}</td>
                  <td>{room.totalBeds}</td>
                  <td>{room.availableBeds}</td>
                  <td>₹{room.pricePerBed.toLocaleString("en-IN")}</td>
                  <td>
                    <select
                      value={room.maintenanceStatus}
                      onChange={(e) =>
                        handleMaintenanceChange(room.id, e.target.value)
                      }
                      className="zx-admin-status-select"
                    >
                      <option value="GOOD">Good</option>
                      <option value="NEEDS_REPAIR">Needs Repair</option>
                      <option value="UNDER_MAINTENANCE">
                        Under Maintenance
                      </option>
                    </select>
                  </td>
                  <td>
                    <div className="zx-admin-actions">
                      <button
                        className="zx-admin-icon-btn"
                        onClick={() => openEditForm(room)}
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="zx-admin-icon-btn zx-admin-icon-btn-danger"
                        onClick={() => handleDelete(room.id, room.roomNumber)}
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

export default RoomsAdmin;
