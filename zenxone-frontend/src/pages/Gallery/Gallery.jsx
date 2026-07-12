import React, { useState } from "react";
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaExpand,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "./Gallery.css";

import terraceImg from "../../assets/images/amazon/terrace.jpg";
import diningImg from "../../assets/images/amazon/dining.jpg";
import roomImg from "../../assets/images/amazon/room1.jpg";
import bathroomImg from "../../assets/images/amazon/bathroom.jpg";

const amazonImages = [
  { img: terraceImg, label: "Terrace & Indoor Games" },
  { img: diningImg, label: "Dining Area" },
  { img: roomImg, label: "Rooms" },
  { img: bathroomImg, label: "Wash Area" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const openLightbox = (index) => setActiveIndex(index);
  const closeLightbox = () => setActiveIndex(null);

  const goPrev = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? amazonImages.length - 1 : prev - 1));
  };

  const goNext = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === amazonImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="zx-gallery-page">
      <section className="zx-page-hero">
        <div className="zx-page-hero-content">
          <span className="zx-section-tag">Gallery</span>
          <h1>Take a Look Inside</h1>
          <p>
            Explore our Amazon property spaces — from cozy rooms to community
            areas.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="zx-gallery-container">
          <div className="zx-gallery-block-header">
            <h2>Amazon Property</h2>
          </div>

          <div className="zx-gallery-grid">
            {amazonImages.map((item, i) => (
              <motion.div
                key={i}
                className="zx-gallery-item"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                onClick={() => openLightbox(i)}
              >
                <img src={item.img} alt={item.label} />
                <div className="zx-gallery-item-overlay">
                  <FaExpand />
                  <span>{item.label}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="zx-gallery-block-header zx-gallery-block-header-spaced">
            <h2>BHK Property</h2>
          </div>

          <div className="zx-gallery-coming-soon">
            <span>Images Coming Soon</span>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="zx-lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button
              className="zx-lightbox-close"
              onClick={closeLightbox}
              aria-label="Close"
            >
              <FaTimes />
            </button>

            <button
              className="zx-lightbox-nav zx-lightbox-prev"
              onClick={goPrev}
              aria-label="Previous"
            >
              <FaChevronLeft />
            </button>

            <motion.div
              className="zx-lightbox-content"
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={amazonImages[activeIndex].img}
                alt={amazonImages[activeIndex].label}
              />
              <p>{amazonImages[activeIndex].label}</p>
            </motion.div>

            <button
              className="zx-lightbox-nav zx-lightbox-next"
              onClick={goNext}
              aria-label="Next"
            >
              <FaChevronRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
