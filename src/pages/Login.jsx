import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/ContextProvider";
import "./Login.css";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${API}/api/auth/login`,
        { identifier, password },
        { withCredentials: true }
      );
      if (data.success) {
        login(data.user);
        toast.success("Login successful 🎉");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials ❌");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="title">Login</h2>
        <p className="subtitle">Access your account to manage your notes</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email or Phone</label>
            <input
              type="text"
              placeholder="Enter email or phone"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Forgot Password Link */}
          <p className="forgot-text">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="signup-text">
          Don’t have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
