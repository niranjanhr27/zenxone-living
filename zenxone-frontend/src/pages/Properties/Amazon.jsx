import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaCheckCircle,
  FaWhatsapp,
  FaCalendarCheck,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { getPropertiesByType } from "../../api/propertyService";
import { getRoomsByProperty } from "../../api/roomService";
import { toast } from "react-toastify";
import "./Amazon.css";

import terraceImg from "../../assets/images/amazon/terrace.jpg";
import diningImg from "../../assets/images/amazon/dining.jpg";
import roomImg from "../../assets/images/amazon/room1.jpg";
import bathroomImg from "../../assets/images/amazon/bathroom.jpg";

const gallery = [
  { img: terraceImg, label: "Terrace & Indoor Games" },
  { img: diningImg, label: "Dining Area" },
  { img: roomImg, label: "Rooms" },
  { img: bathroomImg, label: "Wash Area" },
];

const highlights = [
  "Dining Area",
  "Terrace",
  "Gym",
  "Indoor Games",
  "Wash Area",
  "Rooms",
  "Common Area",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const Amazon = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoomsForAmazon = async () => {
      try {
        const propertiesRes = await getPropertiesByType("AMAZON");
        const amazonProperty = propertiesRes.data[0];

        if (amazonProperty) {
          const roomsRes = await getRoomsByProperty(amazonProperty.id);
          setRooms(roomsRes.data);
        }
      } catch (error) {
        toast.error("Failed to load pricing details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoomsForAmazon();
  }, []);

  return (
    <div className="zx-amazon-page">
      <section className="zx-property-hero">
        <img
          src={terraceImg}
          alt="Amazon Property"
          className="zx-property-hero-bg"
        />
        <div className="zx-property-hero-overlay"></div>
        <div className="zx-property-hero-content">
          <span className="zx-section-tag">Amazon Property</span>
          <h1>Amazon Property</h1>
          <p>
            <FaMapMarkerAlt /> S.G. Palya, Bangalore — 3 minutes from Christ
            University
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="zx-amazon-container">
          {/* GALLERY */}
          <div className="zx-amazon-gallery">
            {gallery.map((g, i) => (
              <motion.div
                key={i}
                className="zx-amazon-gallery-item"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
              >
                <img src={g.img} alt={g.label} />
                <span>{g.label}</span>
              </motion.div>
            ))}
          </div>

          {/* HIGHLIGHTS + PRICING */}
          <div className="zx-amazon-details">
            <motion.div
              className="zx-amazon-highlights"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2>What's Included</h2>
              <div className="zx-amazon-highlights-grid">
                {highlights.map((h, i) => (
                  <div key={i} className="zx-highlight-item">
                    <FaCheckCircle /> {h}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="zx-amazon-pricing-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              variants={fadeUp}
            >
              <h2>Pricing</h2>

              {loading ? (
                <p>Loading pricing...</p>
              ) : (
                rooms.map((room) => (
                  <div key={room.id} className="zx-pricing-row">
                    <span>{room.roomType}</span>
                    <strong>
                      ₹{room.pricePerBed.toLocaleString("en-IN")}
                      <small>/mo</small>
                    </strong>
                  </div>
                ))
              )}

              <div className="zx-amazon-cta-buttons">
                <Link to="/book-now" className="btn-brand zx-amazon-btn">
                  <FaCalendarCheck /> Schedule a Visit
                </Link>
                <a
                  href="https://wa.me/919686480333"
                  target="_blank"
                  rel="noreferrer"
                  className="zx-amazon-btn-secondary"
                >
                  <FaWhatsapp /> Enquire on WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Amazon;
