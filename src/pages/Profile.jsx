import React from "react";
import "./Profile.css";

const Profile = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="profile-overlay">
      <div className="profile-card">
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="profile-header">
          <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
          <h2>{user.name}</h2>
        </div>

        <div className="profile-fields">
          <div className="profile-field">
            <span className="label">Phone:</span>
            <span className="value">{user.phone}</span>
          </div>

          <div className="profile-field">
            <span className="label">Email:</span>
            <span className="value">{user.email}</span>
          </div>

          <div className="profile-field">
            <span className="label">Password:</span>
            <span className="value">{user.password}</span> {/* hashed password */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
