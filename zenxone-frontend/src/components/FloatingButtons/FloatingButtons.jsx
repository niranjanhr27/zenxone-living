import React from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import "./FloatingButtons.css";

const FloatingButtons = () => {
  return (
    <div className="zx-floating-buttons">
      <a
        href="tel:+919686480333"
        className="zx-float-btn zx-call-btn"
        aria-label="Call Now"
      >
        <FaPhoneAlt />
      </a>
      <a
        href="https://wa.me/919686480333"
        target="_blank"
        rel="noreferrer"
        className="zx-float-btn zx-whatsapp-btn"
        aria-label="WhatsApp"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
};

export default FloatingButtons;
