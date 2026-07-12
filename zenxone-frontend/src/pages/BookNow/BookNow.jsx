import React, { useState, useEffect } from "react";
import {
  FaCheck,
  FaUpload,
  FaWhatsapp,
  FaChevronLeft,
  FaChevronRight,
  FaQrcode,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { getActiveProperties } from "../../api/propertyService";
import { getRoomsByProperty } from "../../api/roomService";
import { uploadFile, submitPublicBooking } from "../../api/bookingService";
import "./BookNow.css";

const steps = [
  "Property",
  "Room & Bed",
  "Documents",
  "Parent Details",
  "Payment",
  "Confirmation",
];

const BookNow = () => {
  const [step, setStep] = useState(0);
  const [properties, setProperties] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loadingProperties, setLoadingProperties] = useState(true);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);

  const [formData, setFormData] = useState({
    propertyId: null,
    roomId: null,
    bedId: null,
    aadhaarFile: null,
    photoFile: null,
    parentName: "",
    parentPhone: "",
    emergencyContact: "",
    fullName: "",
    phone: "",
    email: "",
    college: "",
    course: "",
    paymentMethod: "UPI",
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await getActiveProperties();
        console.log("Properties loaded:", res.data);
        setProperties(res.data);
      } catch (error) {
        console.error("Error loading properties:", error);
        toast.error("Failed to load properties.");
      } finally {
        setLoadingProperties(false);
      }
    };
    fetchProperties();
  }, []);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const selectProperty = async (propertyId) => {
    console.log("selectProperty called with:", propertyId);
    updateField("propertyId", propertyId);
    updateField("roomId", null);
    updateField("bedId", null);
    setLoadingRooms(true);
    try {
      const res = await getRoomsByProperty(propertyId);
      console.log("Rooms loaded:", res.data);
      setRooms(res.data);
    } catch (error) {
      console.error("Error loading rooms:", error);
      toast.error("Failed to load rooms.");
    } finally {
      setLoadingRooms(false);
    }
  };

  const nextStep = () => {
    if (step === 0 && !formData.propertyId)
      return toast.error("Please select a property");
    if (step === 1 && !formData.bedId)
      return toast.error("Please select a room and bed");
    if (step === 2 && (!formData.aadhaarFile || !formData.photoFile))
      return toast.error("Please upload both documents");
    if (step === 2 && !formData.consentGiven)
      return toast.error("Please provide consent to proceed");
    if (
      step === 3 &&
      (!formData.fullName ||
        !formData.phone ||
        !formData.parentName ||
        !formData.parentPhone)
    )
      return toast.error("Please fill all required details");
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const selectedRoom = rooms.find((r) => r.id === formData.roomId);
  const selectedBed = selectedRoom?.beds.find((b) => b.id === formData.bedId);
  const selectedProperty = properties.find((p) => p.id === formData.propertyId);

  const handleConfirmBooking = async () => {
    setSubmitting(true);
    try {
      const aadhaarUpload = await uploadFile(formData.aadhaarFile, "aadhaar");
      const photoUpload = await uploadFile(formData.photoFile, "photo");

      const bookingPayload = {
        student: {
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          college: formData.college,
          course: formData.course,
          parentName: formData.parentName,
          parentPhone: formData.parentPhone,
          emergencyContact: formData.emergencyContact,
        },
        propertyId: formData.propertyId,
        roomId: formData.roomId,
        bedId: formData.bedId,
        monthlyRent: selectedRoom.pricePerBed,
        advancePayment: 5000,
        securityDeposit: 10000,
        paymentMethod: formData.paymentMethod,
      };

      const res = await submitPublicBooking(bookingPayload);
      setBookingResult(res.data);
      toast.success("Booking confirmed successfully!");
      setStep(5);
    } catch (error) {
      console.error("Booking error:", error);
      const message =
        error.response?.data?.message || "Booking failed. Please try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="zx-booknow-page">
      <section className="zx-page-hero zx-booknow-hero">
        <div className="zx-page-hero-content">
          <span className="zx-section-tag">Book Now</span>
          <h1>Reserve Your Spot</h1>
          <p>Complete the steps below to secure your room at Zenxone Living.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="zx-booknow-container">
          <div className="zx-stepper">
            {steps.map((s, i) => (
              <div
                key={i}
                className={`zx-step ${i === step ? "zx-step-active" : ""} ${i < step ? "zx-step-done" : ""}`}
              >
                <div className="zx-step-circle">
                  {i < step ? <FaCheck /> : i + 1}
                </div>
                <span className="zx-step-label">{s}</span>
              </div>
            ))}
          </div>

          <div className="zx-booknow-card">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2>Select a Property</h2>
                  {loadingProperties ? (
                    <p>Loading properties...</p>
                  ) : properties.length === 0 ? (
                    <p>No properties available right now.</p>
                  ) : (
                    <div className="zx-property-select-grid">
                      {properties.map((property) => (
                        <div
                          key={property.id}
                          className={`zx-property-select-card ${formData.propertyId === property.id ? "zx-selected" : ""}`}
                          onClick={() => selectProperty(property.id)}
                          style={{ cursor: "pointer" }}
                        >
                          <h3>{property.name}</h3>
                          <p>
                            {property.city}, {property.state}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2>Select Room Type & Bed</h2>
                  {loadingRooms ? (
                    <p>Loading rooms...</p>
                  ) : (
                    <div className="zx-room-select-grid">
                      {rooms.map((room) => (
                        <div
                          key={room.id}
                          className={`zx-room-select-card ${formData.roomId === room.id ? "zx-selected" : ""}`}
                          onClick={() => updateField("roomId", room.id)}
                          style={{ cursor: "pointer" }}
                        >
                          <h3>{room.roomType}</h3>
                          <span>
                            ₹{room.pricePerBed.toLocaleString("en-IN")}/mo
                          </span>
                          <p>{room.availableBeds} bed(s) available</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {formData.roomId && selectedRoom && (
                    <div className="zx-form-group zx-mt-24">
                      <label>Select Bed</label>
                      <div className="zx-room-select-grid">
                        {selectedRoom.beds
                          .filter((b) => b.status === "AVAILABLE")
                          .map((bed) => (
                            <div
                              key={bed.id}
                              className={`zx-room-select-card ${formData.bedId === bed.id ? "zx-selected" : ""}`}
                              onClick={() => updateField("bedId", bed.id)}
                              style={{ cursor: "pointer" }}
                            >
                              <h3>{bed.bedNumber}</h3>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2>Upload Documents</h2>
                  <div className="zx-upload-grid">
                    <label className="zx-upload-box">
                      <FaUpload />
                      <span>
                        {formData.aadhaarFile
                          ? formData.aadhaarFile.name
                          : "Upload Aadhaar Card"}
                      </span>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        hidden
                        onChange={(e) =>
                          updateField("aadhaarFile", e.target.files[0])
                        }
                      />
                    </label>

                    <label className="zx-upload-box">
                      <FaUpload />
                      <span>
                        {formData.photoFile
                          ? formData.photoFile.name
                          : "Upload Student Photo"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) =>
                          updateField("photoFile", e.target.files[0])
                        }
                      />
                    </label>
                  </div>
                  <p className="zx-upload-note">
                    Accepted formats: JPG, PNG, PDF. Max size 5MB per file.
                  </p>
                  <div className="zx-form-group zx-mt-24">
                    <label
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        fontWeight: 400,
                        fontSize: "13px",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={formData.consentGiven || false}
                        onChange={(e) =>
                          updateField("consentGiven", e.target.checked)
                        }
                        style={{ marginTop: "3px" }}
                      />
                      I consent to Zenxone Living securely storing my Aadhaar
                      and photo for verification purposes, in accordance with
                      applicable data protection guidelines.
                    </label>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2>Your Details</h2>
                  <div className="zx-form-group">
                    <label>Your Full Name</label>
                    <input
                      type="text"
                      placeholder="Full name"
                      value={formData.fullName}
                      onChange={(e) => updateField("fullName", e.target.value)}
                    />
                  </div>
                  <div className="zx-form-group">
                    <label>Your Phone</label>
                    <input
                      type="tel"
                      placeholder="Mobile number"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                    />
                  </div>
                  <div className="zx-form-group">
                    <label>Email (Optional)</label>
                    <input
                      type="email"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                    />
                  </div>
                  <div className="zx-form-group">
                    <label>College (Optional)</label>
                    <input
                      type="text"
                      placeholder="College name"
                      value={formData.college}
                      onChange={(e) => updateField("college", e.target.value)}
                    />
                  </div>
                  <h2 className="zx-mt-24">Parent / Guardian Details</h2>
                  <div className="zx-form-group">
                    <label>Parent / Guardian Name</label>
                    <input
                      type="text"
                      placeholder="Full name"
                      value={formData.parentName}
                      onChange={(e) =>
                        updateField("parentName", e.target.value)
                      }
                    />
                  </div>
                  <div className="zx-form-group">
                    <label>Parent / Guardian Phone</label>
                    <input
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={formData.parentPhone}
                      onChange={(e) =>
                        updateField("parentPhone", e.target.value)
                      }
                    />
                  </div>
                  <div className="zx-form-group">
                    <label>Emergency Contact (Optional)</label>
                    <input
                      type="tel"
                      placeholder="Alternate emergency number"
                      value={formData.emergencyContact}
                      onChange={(e) =>
                        updateField("emergencyContact", e.target.value)
                      }
                    />
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2>Advance Payment</h2>
                  <div className="zx-payment-summary">
                    <div className="zx-payment-row">
                      <span>Property</span>
                      <strong>{selectedProperty?.name}</strong>
                    </div>
                    <div className="zx-payment-row">
                      <span>Room Type</span>
                      <strong>{selectedRoom?.roomType}</strong>
                    </div>
                    <div className="zx-payment-row">
                      <span>Monthly Rent</span>
                      <strong>
                        ₹{selectedRoom?.pricePerBed.toLocaleString("en-IN")}
                      </strong>
                    </div>
                    <div className="zx-payment-row zx-payment-row-total">
                      <span>Advance Payment Due</span>
                      <strong>₹5,000</strong>
                    </div>
                  </div>

                  <div className="zx-payment-methods">
                    <label
                      className={`zx-payment-method ${formData.paymentMethod === "UPI" ? "zx-selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={formData.paymentMethod === "UPI"}
                        onChange={() => updateField("paymentMethod", "UPI")}
                      />
                      UPI
                    </label>
                    <label
                      className={`zx-payment-method ${formData.paymentMethod === "CASH" ? "zx-selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={formData.paymentMethod === "CASH"}
                        onChange={() => updateField("paymentMethod", "CASH")}
                      />
                      Cash
                    </label>
                    <label
                      className={`zx-payment-method ${formData.paymentMethod === "BANK_TRANSFER" ? "zx-selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={formData.paymentMethod === "BANK_TRANSFER"}
                        onChange={() =>
                          updateField("paymentMethod", "BANK_TRANSFER")
                        }
                      />
                      Bank Transfer
                    </label>
                  </div>

                  <button
                    className="btn-brand zx-payment-confirm-btn"
                    onClick={handleConfirmBooking}
                    disabled={submitting}
                  >
                    {submitting ? "Processing..." : "Confirm Booking"}
                  </button>
                </motion.div>
              )}

              {step === 5 && bookingResult && (
                <motion.div
                  key="step5"
                  className="zx-confirmation"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="zx-confirmation-check">
                    <FaCheck />
                  </div>
                  <h2>Booking Confirmed!</h2>
                  <p>
                    Your spot at Zenxone Living has been reserved. A
                    confirmation will be sent to your registered contact
                    shortly.
                  </p>

                  <div className="zx-receipt-card">
                    <div className="zx-receipt-row">
                      <span>Booking ID</span>
                      <strong>{bookingResult.bookingId}</strong>
                    </div>
                    <div className="zx-receipt-row">
                      <span>Property</span>
                      <strong>{bookingResult.propertyName}</strong>
                    </div>
                    <div className="zx-receipt-row">
                      <span>Room</span>
                      <strong>
                        {bookingResult.roomNumber} - {bookingResult.bedNumber}
                      </strong>
                    </div>
                    <div className="zx-receipt-row">
                      <span>Advance Paid</span>
                      <strong>
                        ₹{bookingResult.advancePayment.toLocaleString("en-IN")}
                      </strong>
                    </div>
                    <div className="zx-receipt-qr">
                      <FaQrcode />
                    </div>
                    <p className="zx-receipt-note">
                      Show this QR code at check-in
                    </p>
                  </div>

                  <a
                    href="https://wa.me/919686480333"
                    target="_blank"
                    rel="noreferrer"
                    className="zx-confirmation-whatsapp"
                  >
                    <FaWhatsapp /> Need Help? Chat With Us
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

            {step < 5 && (
              <div className="zx-booknow-nav">
                {step > 0 && (
                  <button
                    className="zx-nav-btn zx-nav-btn-back"
                    onClick={prevStep}
                  >
                    <FaChevronLeft /> Back
                  </button>
                )}
                {step < 4 && (
                  <button
                    className="btn-brand zx-nav-btn-next"
                    onClick={nextStep}
                  >
                    Next <FaChevronRight />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookNow;
