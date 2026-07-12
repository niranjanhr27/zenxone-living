import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { getActiveProperties } from "../../api/propertyService";
import { toast } from "react-toastify";
import "./Properties.css";

import roomImg from "../../assets/images/amazon/room1.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await getActiveProperties();
        setProperties(response.data);
      } catch (error) {
        toast.error("Failed to load properties. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="zx-properties-page">
        <section className="zx-page-hero">
          <div className="zx-page-hero-content">
            <span className="zx-section-tag">Our Properties</span>
            <h1>Find Your Perfect Stay</h1>
            <p>Loading properties...</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="zx-properties-page">
      <section className="zx-page-hero">
        <div className="zx-page-hero-content">
          <span className="zx-section-tag">Our Properties</span>
          <h1>Find Your Perfect Stay</h1>
          <p>
            Two premium properties designed for comfort, safety, and community
            living.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="zx-properties-list-grid">
          {properties.map((property, i) => (
            <motion.div
              key={property.id}
              className="zx-property-list-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
            >
              {property.type === "AMAZON" ? (
                <img src={roomImg} alt={property.name} />
              ) : (
                <div className="zx-property-list-coming-soon">
                  <span>Images Coming Soon</span>
                </div>
              )}
              <div className="zx-property-list-info">
                <h2>{property.name}</h2>
                <p>
                  <FaMapMarkerAlt /> {property.city}, {property.state}
                </p>
                <Link
                  to={`/properties/${property.type.toLowerCase()}`}
                  className="btn-brand"
                >
                  View Details <FaArrowRight />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Properties;
