import React from "react";
import { Link } from "react-router-dom";
import {
  FaStar,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaCalendarCheck,
  FaShieldAlt,
  FaWifi,
  FaDumbbell,
  FaUtensils,
} from "react-icons/fa";
import { motion } from "framer-motion";
import "./Home.css";

// Replace these paths with your actual uploaded photos once added to assets/images/amazon
import terraceImg from "../../assets/images/amazon/terrace.jpg";
import diningImg from "../../assets/images/amazon/dining.jpg";
import roomImg from "../../assets/images/amazon/room1.jpg";

const stats = [
  { number: "2", label: "Premium Properties" },
  { number: "100+", label: "Happy Residents" },
  { number: "24x7", label: "Security & Support" },
  { number: "4.8★", label: "Average Rating" },
];

const features = [
  {
    icon: <FaShieldAlt />,
    title: "24x7 Security",
    desc: "CCTV surveillance and round-the-clock female warden support",
  },
  {
    icon: <FaWifi />,
    title: "High-Speed WiFi",
    desc: "Stay connected with uninterrupted high-speed internet",
  },
  {
    icon: <FaDumbbell />,
    title: "Gym & Terrace",
    desc: "Fully equipped gym and terrace sit-out for relaxation",
  },
  {
    icon: <FaUtensils />,
    title: "Dining & Mess",
    desc: "Hygienic dining area with quality veg meals",
  },
];

const testimonials = [
  {
    name: "Priya S.",
    role: "Student, Christ University",
    text: "Zenxone feels like a second home. Safe, clean, and the staff genuinely care about us.",
  },
  {
    name: "Ananya R.",
    role: "Working Professional",
    text: "Best hostel experience in Bangalore. The terrace and gym are huge plus points.",
  },
  {
    name: "Meghana K.",
    role: "Student",
    text: "Food quality and housekeeping are excellent. Highly recommend for girls looking for a safe stay.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const Home = () => {
  return (
    <div className="zx-home">
      {/* HERO SECTION */}
      <section className="zx-hero">
        <div className="zx-hero-overlay"></div>
        <img
          src={terraceImg}
          alt="Zenxone Living Terrace"
          className="zx-hero-bg"
        />
        <div className="zx-hero-content">
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="zx-hero-tag"
          >
            The Perfect Place To Belong
          </motion.p>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="zx-hero-title"
          >
            Premium Girls' Hostel &<br /> PG Living in Bangalore
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="zx-hero-subtitle"
          >
            Safe, comfortable, and fully-equipped stays near Christ University —
            designed for students and working professionals.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
            className="zx-hero-actions"
          >
            <Link to="/book-now" className="btn-brand zx-hero-btn-primary">
              <FaCalendarCheck /> Schedule a Visit
            </Link>
            <a
              href="https://wa.me/919686480333"
              target="_blank"
              rel="noreferrer"
              className="zx-hero-btn-secondary"
            >
              <FaWhatsapp /> Chat on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="zx-stats">
        <div className="zx-stats-container">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="zx-stat-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
            >
              <h2>{stat.number}</h2>
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="section-padding zx-features">
        <div className="zx-section-header">
          <span className="zx-section-tag">Why Choose Us</span>
          <h2>Everything You Need, All In One Place</h2>
        </div>

        <div className="zx-features-grid">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="zx-feature-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
            >
              <div className="zx-feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROPERTIES PREVIEW */}
      <section className="section-padding zx-properties-preview">
        <div className="zx-section-header">
          <span className="zx-section-tag">Our Properties</span>
          <h2>Choose Your Perfect Stay</h2>
        </div>

        <div className="zx-properties-grid">
          <motion.div
            className="zx-property-card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <img src={roomImg} alt="Amazon Property" />
            <div className="zx-property-info">
              <h3>Amazon Property</h3>
              <p>
                <FaMapMarkerAlt /> S.G. Palya, Bangalore
              </p>
              <div className="zx-property-pricing">
                <span>1 BHK — ₹22,000/mo</span>
                <span>2 BHK — ₹18,000/mo</span>
              </div>
              <Link to="/properties/amazon" className="btn-brand">
                View Details
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="zx-property-card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeUp}
          >
            <div className="zx-property-coming-soon">
              <span>Images Coming Soon</span>
            </div>
            <div className="zx-property-info">
              <h3>BHK Property</h3>
              <p>
                <FaMapMarkerAlt /> Bangalore
              </p>
              <div className="zx-property-pricing">
                <span>1 Sharing — ₹40,000/mo</span>
                <span>2 Sharing — ₹30,000/mo</span>
                <span>3 Sharing — ₹20,000/mo</span>
              </div>
              <Link to="/properties/bhk" className="btn-brand">
                View Details
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-padding zx-testimonials">
        <div className="zx-section-header">
          <span className="zx-section-tag">Student Reviews</span>
          <h2>What Our Residents Say</h2>
        </div>

        <div className="zx-testimonials-grid">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="zx-testimonial-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
            >
              <div className="zx-testimonial-stars">
                {[...Array(5)].map((_, idx) => (
                  <FaStar key={idx} />
                ))}
              </div>
              <p className="zx-testimonial-text">"{t.text}"</p>
              <div className="zx-testimonial-author">
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="zx-cta">
        <div className="zx-cta-content">
          <h2>Ready to Find Your Perfect Stay?</h2>
          <p>Book a visit today and experience Zenxone Living firsthand.</p>
          <Link to="/book-now" className="btn-brand zx-cta-btn">
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
