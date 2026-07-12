import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { ThemeContext } from "../../context/ThemeContext";
import zenxoneLogo from "../../assets/images/logo/zenxone-logo.png";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Properties", path: "/properties" },
    { name: "Gallery", path: "/gallery" },
    { name: "Amenities", path: "/amenities" },
    { name: "Pricing", path: "/pricing" },
    { name: "Reviews", path: "/reviews" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className={`zx-navbar ${scrolled ? "zx-navbar-scrolled" : ""}`}>
      <div className="zx-navbar-container">
        <Link to="/" className="zx-logo" onClick={() => setIsOpen(false)}>
          <img
            src={zenxoneLogo}
            alt="Zenxone Living"
            className="zx-navbar-logo-img"
          />
        </Link>

        <div className={`zx-links ${isOpen ? "zx-links-open" : ""}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                "zx-link" + (isActive ? " zx-link-active" : "")
              }
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="zx-actions">
          <button
            className="zx-theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <Link to="/login" className="zx-login-btn">
            Login
          </Link>
          <Link to="/book-now" className="btn-brand zx-book-btn">
            Book Now
          </Link>

          <button className="zx-hamburger" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
