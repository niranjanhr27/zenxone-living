import React from "react";
import { Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaUserShield,
  FaBroom,
  FaTint,
  FaWifi,
  FaBolt,
  FaTshirt,
  FaSnowflake,
  FaUtensils,
  FaGamepad,
  FaDumbbell,
  FaUmbrellaBeach,
  FaGraduationCap,
  FaUsers,
  FaArrowUp,
  FaVideo,
  FaCalendarCheck,
  FaShower,
  FaParking,
  FaUserMd,
  FaUserCheck,
  FaExclamationTriangle,
  FaCalendarAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import "./Amenities.css";

const amenities = [
  { icon: <FaShieldAlt />, name: "24x7 Security" },
  { icon: <FaUserShield />, name: "Female Warden" },
  { icon: <FaBroom />, name: "Housekeeping" },
  { icon: <FaTint />, name: "RO Water" },
  { icon: <FaWifi />, name: "WiFi" },
  { icon: <FaBolt />, name: "Power Backup" },
  { icon: <FaTshirt />, name: "Laundry" },
  { icon: <FaShower />, name: "Washing Machine" },
  { icon: <FaSnowflake />, name: "Refrigerator" },
  { icon: <FaUtensils />, name: "Dining Hall" },
  { icon: <FaGamepad />, name: "Indoor Games" },
  { icon: <FaDumbbell />, name: "Gym" },
  { icon: <FaUmbrellaBeach />, name: "Terrace Sitout" },
  { icon: <FaGraduationCap />, name: "Career Guidance" },
  { icon: <FaUsers />, name: "Community Events" },
  { icon: <FaArrowUp />, name: "Lift" },
  { icon: <FaVideo />, name: "CCTV Surveillance" },
  { icon: <FaCalendarCheck />, name: "Daily Cleaning" },
  { icon: <FaTint />, name: "Hot Water" },
  { icon: <FaParking />, name: "Parking" },
  { icon: <FaUserMd />, name: "Doctor on Call" },
  { icon: <FaUserCheck />, name: "Visitor Management" },
  { icon: <FaExclamationTriangle />, name: "Emergency Support" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.5, ease: "easeOut" },
  }),
};

const Amenities = () => {
  return (
    <div className="zx-amenities-page">
      <section className="zx-page-hero">
        <div className="zx-page-hero-content">
          <span className="zx-section-tag">Amenities</span>
          <h1>Everything You Need Under One Roof</h1>
          <p>
            From safety and comfort to community and career growth — we've
            thought of it all.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="zx-amenities-container">
          <div className="zx-amenities-grid">
            {amenities.map((a, i) => (
              <motion.div
                key={i}
                className="zx-amenity-card"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
              >
                <div className="zx-amenity-icon">{a.icon}</div>
                <span>{a.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="zx-amenities-cta">
        <div className="zx-amenities-cta-content">
          <h2>Experience It Yourself</h2>
          <p>
            Book a visit and see why residents call Zenxone Living their perfect
            place to belong.
          </p>
          <Link to="/book-now" className="btn-brand zx-amenities-cta-btn">
            Schedule a Visit
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Amenities;
