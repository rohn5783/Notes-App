import React from "react";
import "../styles/userProfile.scss";
import { useAuth } from "../../auth/hooks/useAuth";

import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();

  // Example user data (backend se aayega baad me)
  const user = {
    name: "Rohit Kumar",
    email: "rohit@gmail.com",
    createdAt: "10 March 2026",
  };

  const { logout } = useAuth();

  const handleLogOut = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>User Profile</h2>

        <div className="profile-info">
          <p>
            <span>Name:</span> {user.name}
          </p>

          <p>
            <span>Email:</span> {user.email}
          </p>

          <p>
            <span>Account Created:</span> {user.createdAt}
          </p>
        </div>

        <button className="logout-btn" onClick={handleLogOut}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
