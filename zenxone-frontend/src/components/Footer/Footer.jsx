import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="zx-footer">
      <div className="zx-footer-container">
        <div className="zx-footer-col">
          <h3 className="zx-footer-logo">
            ZEN<span>X</span>ONE LIVING
          </h3>
          <p>The Perfect Place To Belong</p>
          <p className="zx-footer-address">
            <FaMapMarkerAlt /> #6, 8th Cross, 1st Main, Venkateshwara Layout,
            Opp Srinivasa Theatre, S.G. Palya, Bangalore - 560029
          </p>
        </div>

        <div className="zx-footer-col">
          <h4>Quick Links</h4>
          <Link to="/properties">Properties</Link>
          <Link to="/amenities">Amenities</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/book-now">Book Now</Link>
        </div>

        <div className="zx-footer-col">
          <h4>Properties</h4>
          <Link to="/properties/amazon">Amazon Property</Link>
          <Link to="/properties/bhk">BHK Property</Link>
        </div>

        <div className="zx-footer-col">
          <h4>Contact Us</h4>
          <p>
            <FaPhone /> +91 96864 80333 / +91 96864 85333
          </p>
          <p>
            <FaEnvelope /> info@zenxoneliving.com
          </p>
          <div className="zx-footer-social">
            <a href="#">
              <FaFacebookF />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/919686480333"
              target="_blank"
              rel="noreferrer"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      <div className="zx-footer-bottom">
        © {new Date().getFullYear()} Zenxone Living. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
