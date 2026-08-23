import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await API.post(
        "/api/auth/register",
        formData
      );

      alert(
        response.data.message ||
          "Registration successful!"
      );

      // Clear form
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        location: "",
      });

      // Go to Login page
      navigate("/login");

    } catch (error) {
      console.error(
        "Registration error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        {/* LOGO */}

        <div className="auth-logo">
          📚
        </div>

        <h1>Create Account</h1>

        <p className="auth-subtitle">
          Join BookBazaar and start buying and selling books
        </p>

        {/* FORM */}

        <form onSubmit={handleSubmit}>

          <div className="auth-form-group">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-form-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>

          <div className="auth-form-group">
            <label>Phone Number</label>

            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-form-group">
            <label>Location</label>

            <input
              type="text"
              name="location"
              placeholder="Enter your location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "📝 Create Account"}
          </button>

        </form>

        {/* LOGIN LINK */}

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">
            Login here
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;