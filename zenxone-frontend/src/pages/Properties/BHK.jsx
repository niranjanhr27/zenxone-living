import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaWhatsapp,
  FaCalendarCheck,
  FaClock,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { getPropertiesByType } from "../../api/propertyService";
import { getRoomsByProperty } from "../../api/roomService";
import { toast } from "react-toastify";
import "./BHK.css";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const BHK = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoomsForBHK = async () => {
      try {
        const propertiesRes = await getPropertiesByType("BHK");
        const bhkProperty = propertiesRes.data[0];

        if (bhkProperty) {
          const roomsRes = await getRoomsByProperty(bhkProperty.id);
          setRooms(roomsRes.data);
        }
      } catch (error) {
        toast.error("Failed to load pricing details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoomsForBHK();
  }, []);

  return (
    <div className="zx-bhk-page">
      <section className="zx-bhk-hero">
        <div className="zx-bhk-hero-content">
          <span className="zx-section-tag">BHK Property</span>
          <h1>BHK Property</h1>
          <p>
            <FaMapMarkerAlt /> Bangalore
          </p>
          <div className="zx-bhk-coming-badge">
            <FaClock /> Images Coming Soon
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="zx-bhk-container">
          <motion.div
            className="zx-bhk-pricing-card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2>Pricing Plans</h2>

            <div className="zx-bhk-pricing-grid">
              {loading ? (
                <p>Loading pricing...</p>
              ) : (
                rooms.map((room, i) => (
                  <motion.div
                    key={room.id}
                    className="zx-bhk-pricing-item"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i}
                    variants={fadeUp}
                  >
                    <span>{room.roomType}</span>
                    <strong>
                      ₹{room.pricePerBed.toLocaleString("en-IN")}
                      <small>/mo</small>
                    </strong>
                  </motion.div>
                ))
              )}
            </div>

            <p className="zx-bhk-note">
              Interested in the BHK property? Reach out to our team for a
              personalized visit and full details on availability.
            </p>

            <div className="zx-bhk-cta-buttons">
              <Link to="/book-now" className="btn-brand zx-bhk-btn">
                <FaCalendarCheck /> Schedule a Visit
              </Link>
              <a
                href="https://wa.me/919686480333"
                target="_blank"
                rel="noreferrer"
                className="zx-bhk-btn-secondary"
              >
                <FaWhatsapp /> Enquire on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BHK;
