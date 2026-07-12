import React, { useState, useEffect } from "react";
import { FaEdit, FaSignOutAlt, FaTimes } from "react-icons/fa";
import {
  getAllStudents,
  updateStudent,
  moveOutStudent,
} from "../../api/adminStudentService";
import { toast } from "react-toastify";
import "./AdminTables.css";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingStudent, setEditingStudent] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    college: "",
    course: "",
    parentName: "",
    parentPhone: "",
    emergencyContact: "",
  });

  const fetchStudents = async () => {
    try {
      const res = await getAllStudents();
      setStudents(res.data);
    } catch (error) {
      toast.error("Failed to load students.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openEditModal = (student) => {
    setFormData({
      fullName: student.fullName || "",
      phone: student.phone || "",
      email: student.email || "",
      college: student.college || "",
      course: student.course || "",
      parentName: student.parentName || "",
      parentPhone: student.parentPhone || "",
      emergencyContact: student.emergencyContact || "",
    });
    setEditingStudent(student);
  };

  const closeEditModal = () => {
    setEditingStudent(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await updateStudent(editingStudent.id, formData);
      toast.success("Student details updated successfully");
      closeEditModal();
      fetchStudents();
    } catch (error) {
      toast.error("Failed to update student details");
    } finally {
      setSubmitting(false);
    }
  };

  const handleMoveOut = async (id, name) => {
    if (
      !window.confirm(`Mark ${name} as moved out? This will free up their bed.`)
    )
      return;
    try {
      await moveOutStudent(id);
      toast.success("Student marked as moved out");
      fetchStudents();
    } catch (error) {
      toast.error("Failed to update student status");
    }
  };

  return (
    <div className="zx-admin-table-page">
      <h1>Students</h1>
      <p className="zx-admin-subtitle">
        All students currently residing or previously resided at Zenxone Living.
      </p>

      {loading ? (
        <p>Loading students...</p>
      ) : students.length === 0 ? (
        <p>No students yet.</p>
      ) : (
        <div className="zx-admin-table-wrapper">
          <table className="zx-admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>College</th>
                <th>Property</th>
                <th>Room / Bed</th>
                <th>Move In</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.fullName}</td>
                  <td>{student.phone}</td>
                  <td>{student.college || "-"}</td>
                  <td>{student.propertyName || "-"}</td>
                  <td>
                    {student.roomNumber
                      ? `${student.roomNumber} - ${student.bedNumber}`
                      : "-"}
                  </td>
                  <td>{student.moveInDate || "-"}</td>
                  <td>{student.status}</td>
                  <td>
                    <div className="zx-admin-actions">
                      <button
                        className="zx-admin-icon-btn"
                        onClick={() => openEditModal(student)}
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      {student.status === "ACTIVE" && (
                        <button
                          className="zx-admin-icon-btn zx-admin-icon-btn-danger"
                          onClick={() =>
                            handleMoveOut(student.id, student.fullName)
                          }
                          title="Move Out"
                        >
                          <FaSignOutAlt />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editingStudent && (
        <div className="zx-admin-modal-overlay" onClick={closeEditModal}>
          <div className="zx-admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="zx-admin-modal-header">
              <h2>Edit Student</h2>
              <button className="zx-admin-icon-btn" onClick={closeEditModal}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="zx-admin-form">
              <div className="zx-admin-form-row">
                <div className="zx-form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
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
                  <label>College</label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                  />
                </div>
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

              <div className="zx-admin-form-row">
                <div className="zx-form-group">
                  <label>Parent Name</label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                  />
                </div>
                <div className="zx-form-group">
                  <label>Parent Phone</label>
                  <input
                    type="tel"
                    name="parentPhone"
                    value={formData.parentPhone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="zx-form-group">
                <label>Emergency Contact</label>
                <input
                  type="tel"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                />
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

export default Students;
