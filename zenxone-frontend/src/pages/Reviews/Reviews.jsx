import React from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import "./Reviews.css";

const reviews = [
  {
    name: "Priya S.",
    role: "Student, Christ University",
    rating: 5,
    text: "Zenxone feels like a second home. Safe, clean, and the staff genuinely care about us. The terrace area is my favorite spot to unwind after classes.",
  },
  {
    name: "Ananya R.",
    role: "Working Professional",
    rating: 5,
    text: "Best hostel experience in Bangalore. The terrace and gym are huge plus points. Housekeeping is consistent and the WiFi never lags.",
  },
  {
    name: "Meghana K.",
    role: "Student",
    rating: 5,
    text: "Food quality and housekeeping are excellent. Highly recommend for girls looking for a safe stay near Christ University.",
  },
  {
    name: "Sowmya N.",
    role: "Student, Mount Carmel College",
    rating: 4,
    text: "Great location and very responsive staff. The community events helped me make friends quickly after moving from my hometown.",
  },
  {
    name: "Divya K.",
    role: "Working Professional",
    rating: 5,
    text: "Security here is top notch — CCTV everywhere and a female warden always around. My parents are much more at ease now.",
  },
  {
    name: "Rakshita M.",
    role: "Student",
    rating: 5,
    text: "The career guidance sessions were an unexpected but very welcome bonus. Rooms are spacious and always kept clean.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const Reviews = () => {
  const avgRating = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <div className="zx-reviews-page">
      <section className="zx-page-hero">
        <div className="zx-page-hero-content">
          <span className="zx-section-tag">Student Reviews</span>
          <h1>What Our Residents Say</h1>
          <p>
            Real experiences from students and professionals living at Zenxone.
          </p>

          <div className="zx-reviews-summary">
            <div className="zx-reviews-summary-score">
              <span className="zx-reviews-summary-number">{avgRating}</span>
              <div className="zx-reviews-summary-stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
            </div>
            <p>Based on {reviews.length}+ verified resident reviews</p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="zx-reviews-grid">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              className="zx-review-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
            >
              <FaQuoteLeft className="zx-review-quote-icon" />
              <div className="zx-review-stars">
                {[...Array(5)].map((_, idx) => (
                  <FaStar
                    key={idx}
                    className={
                      idx < r.rating ? "zx-star-filled" : "zx-star-empty"
                    }
                  />
                ))}
              </div>
              <p className="zx-review-text">{r.text}</p>
              <div className="zx-review-author">
                <div className="zx-review-avatar">{r.name.charAt(0)}</div>
                <div>
                  <strong>{r.name}</strong>
                  <span>{r.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Reviews;
