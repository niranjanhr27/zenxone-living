import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "./FAQ.css";

const faqs = [
  {
    q: "What is included in the monthly rent?",
    a: "Rent includes accommodation, WiFi, power backup, RO water, housekeeping, and access to all common amenities like the gym, terrace, and indoor games area.",
  },
  {
    q: "Is food/mess facility available?",
    a: "Yes, we have a dedicated dining hall with hygienic veg meals included as part of our amenities.",
  },
  {
    q: "Is Zenxone Living only for girls?",
    a: "Yes, Zenxone Living is a dedicated all-girls hostel with a female warden and round-the-clock security for resident safety.",
  },
  {
    q: "How far is it from Christ University?",
    a: "Our Amazon Property is just about 3 minutes away from Christ University, making it ideal for students.",
  },
  {
    q: "What documents are required for booking?",
    a: "You will need to upload a valid Aadhaar card, a recent passport-size photo, and parent/guardian details during the booking process.",
  },
  {
    q: "Is there a security deposit?",
    a: "Yes, a refundable security deposit is required at the time of move-in, in addition to the advance payment.",
  },
  {
    q: "Can I schedule a visit before booking?",
    a: "Absolutely — you can schedule a visit directly through our website or reach out to us on WhatsApp / call to arrange a convenient time.",
  },
  {
    q: "What are the visiting hours for parents/guardians?",
    a: "We maintain a visitor management system for safety. Please contact our team to know the current visiting hours and guidelines.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="zx-faq-page">
      <section className="zx-page-hero">
        <div className="zx-page-hero-content">
          <span className="zx-section-tag">FAQ</span>
          <h1>Frequently Asked Questions</h1>
          <p>
            Everything you need to know before booking your stay at Zenxone
            Living.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="zx-faq-container">
          {faqs.map((faq, i) => (
            <div key={i} className="zx-faq-item">
              <button className="zx-faq-question" onClick={() => toggle(i)}>
                <span>{faq.q}</span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="zx-faq-icon"
                >
                  <FaChevronDown />
                </motion.span>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    className="zx-faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <p>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FAQ;
