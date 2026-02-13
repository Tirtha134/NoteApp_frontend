// Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Navbar.css";
import { useAuth } from "../context/ContextProvider";

const Navbar = ({ setQuery, openProfile }) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully 👋");
    } catch (error) {
      toast.error("Logout failed ❌");
    }
  };

  return (
    <nav className="navbar">
      {/* Left */}
      <div className="navbar-left">
        <Link to="/" className="logo">NoteApp</Link>
      </div>

      {/* Middle */}
      <div className="navbar-center">
        <input
          type="text"
          placeholder="Search Notes..."
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Right */}
      <div className="navbar-right">
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Signup</Link>
          </>
        ) : (
          <>
            <div className="user-info">
              <div className="user-avatar">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="username">{user.name}</span>
            </div>

            <button className="profile-btn" onClick={openProfile}>
              Profile
            </button>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
