import React from "react";
import { Link } from "react-router-dom";
import {
  FaBullseye,
  FaHeart,
  FaHandsHelping,
  FaAward,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import "./About.css";

import terraceImg from "../../assets/images/amazon/terrace.jpg";
import diningImg from "../../assets/images/amazon/dining.jpg";

const values = [
  {
    icon: <FaHeart />,
    title: "Safety First",
    desc: "Female wardens, CCTV surveillance, and secure check-ins so every resident feels protected.",
  },
  {
    icon: <FaHandsHelping />,
    title: "Community Living",
    desc: "From community events to career guidance, we build more than just a place to stay.",
  },
  {
    icon: <FaAward />,
    title: "Quality Standards",
    desc: "Hygienic dining, daily housekeeping, and well-maintained rooms — no compromises.",
  },
  {
    icon: <FaBullseye />,
    title: "Student-Focused",
    desc: "Designed around the real needs of students and young professionals in Bangalore.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" },
  }),
};

const About = () => {
  return (
    <div className="zx-about-page">
      <section className="zx-page-hero">
        <div className="zx-page-hero-content">
          <span className="zx-section-tag">About Us</span>
          <h1>The Perfect Place To Belong</h1>
          <p>
            Zenxone Living was built on a simple idea — that a hostel should
            feel like home.
          </p>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="section-padding">
        <div className="zx-about-story">
          <motion.div
            className="zx-about-story-text"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="zx-section-tag">Our Story</span>
            <h2>Built For Students, Run Like a Home</h2>
            <p>
              Zenxone Living started with a clear mission: give students and
              young professionals in Bangalore a place to stay that's genuinely
              safe, comfortable, and welcoming — not just another hostel with
              four walls and a bed.
            </p>
            <p>
              Located just minutes from Christ University in S.G. Palya, our
              Amazon Property brings together everything residents need — from a
              fully-equipped gym and terrace sit-out to a dedicated dining hall
              and indoor games area. Our upcoming BHK Property extends the same
              philosophy with flexible sharing options for those who want more
              space and privacy.
            </p>
            <p>
              Every decision — from hiring female wardens to installing CCTV
              across common areas — comes back to one thing: making sure the
              people who live with us feel truly at home.
            </p>
            <div className="zx-about-location">
              <FaMapMarkerAlt />
              <span>
                #6, 8th Cross, 1st Main, Venkateshwara Layout, Opp Srinivasa
                Theatre, S.G. Palya, Bangalore - 560029
              </span>
            </div>
          </motion.div>

          <motion.div
            className="zx-about-story-images"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeUp}
          >
            <img
              src={terraceImg}
              alt="Zenxone Terrace"
              className="zx-about-img-main"
            />
            <img
              src={diningImg}
              alt="Zenxone Dining"
              className="zx-about-img-secondary"
            />
          </motion.div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="section-padding zx-about-values">
        <div className="zx-section-header">
          <span className="zx-section-tag">What We Stand For</span>
          <h2>Our Core Values</h2>
        </div>

        <div className="zx-values-grid">
          {values.map((v, i) => (
            <motion.div
              key={i}
              className="zx-value-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
            >
              <div className="zx-value-icon">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="zx-cta">
        <div className="zx-cta-content">
          <h2>Come See It For Yourself</h2>
          <p>
            Schedule a visit and experience why residents call Zenxone Living
            their perfect place to belong.
          </p>
          <Link to="/book-now" className="btn-brand zx-cta-btn">
            Schedule a Visit
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
