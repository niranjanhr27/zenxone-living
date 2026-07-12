import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { login } from "../../api/authService";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login(formData.username, formData.password);
      const { token, username, fullName, role } = response.data;

      localStorage.setItem("zx-auth-token", token);
      localStorage.setItem(
        "zx-user",
        JSON.stringify({ username, fullName, role }),
      );

      toast.success(`Welcome back, ${fullName}!`);
      navigate("/admin");
    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="zx-login-page">
      <div className="zx-login-container">
        <motion.div
          className="zx-login-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="zx-login-header">
            <div className="zx-login-logo">
              <span className="zx-login-logo-zx">ZX</span>
              <span className="zx-login-logo-text">ZENXONE</span>
            </div>
            <p>Sign in to manage your Zenxone Living account</p>
          </div>

          <form className="zx-login-form" onSubmit={handleSubmit}>
            <div className="zx-form-group">
              <label>Username</label>
              <div className="zx-input-wrapper">
                <FaUser className="zx-input-icon" />
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="zx-form-group">
              <label>Password</label>
              <div className="zx-input-wrapper">
                <FaLock className="zx-input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="zx-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn-brand zx-login-submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
