import React from "react";
import { Link } from "react-router-dom";
import { FaCheck, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import "./Pricing.css";

const amazonPlans = [
  {
    type: "1 BHK",
    price: "22,000",
    features: [
      "Private Room",
      "Attached Wash Area",
      "All Amenities Included",
      "Housekeeping Daily",
    ],
  },
  {
    type: "2 BHK",
    price: "18,000",
    features: [
      "Shared Room (2 Beds)",
      "Attached Wash Area",
      "All Amenities Included",
      "Housekeeping Daily",
    ],
  },
];

const bhkPlans = [
  {
    type: "1 Sharing",
    price: "40,000",
    features: [
      "Private Room",
      "Maximum Privacy",
      "All Amenities Included",
      "Priority Support",
    ],
  },
  {
    type: "2 Sharing",
    price: "30,000",
    features: [
      "Shared Room (2 Beds)",
      "Balanced Comfort",
      "All Amenities Included",
      "Housekeeping Daily",
    ],
  },
  {
    type: "3 Sharing",
    price: "20,000",
    features: [
      "Shared Room (3 Beds)",
      "Budget Friendly",
      "All Amenities Included",
      "Housekeeping Daily",
    ],
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

const Pricing = () => {
  return (
    <div className="zx-pricing-page">
      <section className="zx-page-hero">
        <div className="zx-page-hero-content">
          <span className="zx-section-tag">Pricing</span>
          <h1>Simple, Transparent Pricing</h1>
          <p>
            No hidden fees. Choose the plan that fits your comfort and budget.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="zx-pricing-block">
          <h2 className="zx-pricing-block-title">Amazon Property</h2>
          <div className="zx-pricing-grid">
            {amazonPlans.map((plan, i) => (
              <motion.div
                key={i}
                className="zx-pricing-plan-card"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
              >
                <h3>{plan.type}</h3>
                <div className="zx-pricing-amount">
                  ₹{plan.price}
                  <small>/mo</small>
                </div>
                <ul>
                  {plan.features.map((f, idx) => (
                    <li key={idx}>
                      <FaCheck /> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/book-now" className="btn-brand zx-pricing-btn">
                  Book Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="zx-pricing-block zx-pricing-block-spaced">
          <h2 className="zx-pricing-block-title">BHK Property</h2>
          <div className="zx-pricing-grid zx-pricing-grid-3">
            {bhkPlans.map((plan, i) => (
              <motion.div
                key={i}
                className={`zx-pricing-plan-card ${i === 1 ? "zx-pricing-plan-featured" : ""}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
              >
                {i === 1 && (
                  <span className="zx-pricing-badge">Most Popular</span>
                )}
                <h3>{plan.type}</h3>
                <div className="zx-pricing-amount">
                  ₹{plan.price}
                  <small>/mo</small>
                </div>
                <ul>
                  {plan.features.map((f, idx) => (
                    <li key={idx}>
                      <FaCheck /> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/book-now" className="btn-brand zx-pricing-btn">
                  Book Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="zx-pricing-help">
          <p>Have questions about pricing or need a custom plan?</p>
          <a
            href="https://wa.me/919686480333"
            target="_blank"
            rel="noreferrer"
            className="zx-pricing-help-btn"
          >
            <FaWhatsapp /> Chat With Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
