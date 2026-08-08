import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBuilding,
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { toast } from "react-toastify";

import api from "../services/api";
import "../assets/styles/auth.css";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);

      const { data } = await api.post("/auth/register", formData);

      toast.success(data.message);

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-right">
        <div className="auth-card">
          <h2>Create Account 🚀</h2>

          <p>Create your admin account</p>

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="form-group">
              <label>Full Name</label>

              <div className="input-group">
                <FaUser className="input-icon" />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <label>Email</label>

              <div className="input-group">
                <FaEnvelope className="input-icon" />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label>Password</label>

              <div className="input-group">
                <FaLock className="input-icon" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="auth-link">
            Already have an account?
            <Link to="/"> Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
