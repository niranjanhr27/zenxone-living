import React, { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { submitPublicLead } from "../../api/leadService";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await submitPublicLead({
        leadName: formData.name,
        phone: formData.phone,
        email: formData.email,
        leadSource: "WEBSITE",
        remarks: formData.message,
      });
      toast.success("Message sent! We'll get back to you shortly.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to send message. Please try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="zx-contact-page">
      <section className="zx-page-hero">
        <div className="zx-page-hero-content">
          <span className="zx-section-tag">Contact Us</span>
          <h1>Get In Touch</h1>
          <p>Have a question or ready to book? We're here to help.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="zx-contact-container">
          <motion.div
            className="zx-contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2>Contact Information</h2>
            <p className="zx-contact-subtitle">
              Reach out to us through any of these channels — we typically
              respond within a few hours.
            </p>

            <div className="zx-contact-item">
              <div className="zx-contact-icon">
                <FaPhone />
              </div>
              <div>
                <strong>Phone</strong>
                <p>+91 96864 80333 / +91 96864 85333</p>
              </div>
            </div>

            <div className="zx-contact-item">
              <div className="zx-contact-icon">
                <FaEnvelope />
              </div>
              <div>
                <strong>Email</strong>
                <p>info@zenxoneliving.com</p>
              </div>
            </div>

            <div className="zx-contact-item">
              <div className="zx-contact-icon">
                <FaMapMarkerAlt />
              </div>
              <div>
                <strong>Address</strong>
                <p>
                  #6, 8th Cross, 1st Main, Venkateshwara Layout, Opp Srinivasa
                  Theatre, S.G. Palya, Bangalore - 560029
                </p>
              </div>
            </div>

            <a
              href="https://wa.me/919686480333"
              target="_blank"
              rel="noreferrer"
              className="zx-contact-whatsapp-btn"
            >
              <FaWhatsapp /> Chat on WhatsApp
            </a>

            <div className="zx-contact-map">
              <iframe
                title="Zenxone Living Location"
                src="https://www.google.com/maps?q=S.G.+Palya+Bangalore&output=embed"
                width="100%"
                height="220"
                style={{ border: 0, borderRadius: "14px" }}
                loading="lazy"
              ></iframe>
            </div>
          </motion.div>

          <motion.div
            className="zx-contact-form-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2>Send a Message</h2>
            <form onSubmit={handleSubmit} className="zx-contact-form">
              <div className="zx-form-row">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <button
                type="submit"
                className="btn-brand zx-contact-submit"
                disabled={submitting}
              >
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
