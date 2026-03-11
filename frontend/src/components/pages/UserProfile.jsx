import React from "react";
import "../styles/userProfile.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import { useNotes } from "../../auth/hooks/useNotes";
import { motion } from "framer-motion";

const UserProfile = () => {
  const MotionDiv = motion.div;
  const MotionButton = motion.button;

  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { notes, loading } = useNotes();

  // latest 3 notes preview
  const previewNotes = notes?.slice(0, 3);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-page">

      <MotionDiv
        className="profile-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >

        {/* Profile Header */}

        <div className="profile-header">

          <MotionDiv
            className="avatar"
            whileHover={{ scale: 1.1 }}
          >
            {user?.userName?.charAt(0)?.toUpperCase()}
          </MotionDiv>

          <div className="user-info">
            <h2>{user?.userName}</h2>
            <p>{user?.email}</p>
          </div>

        </div>

        {/* Notes Section */}

        <div className="notes-section">

          <div className="notes-header">

            <h3>Your Notes</h3>

            <MotionButton
              className="add-note-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/notes")}
            >
              + Add Note
            </MotionButton>

          </div>

          <div className="notes-grid">

            {loading && <p className="empty">Loading notes...</p>}

            {!loading && previewNotes.length === 0 && (
              <p className="empty">No notes yet.</p>
            )}

            {!loading && previewNotes.map((note) => (

              <MotionDiv
                key={note._id}
                className="note-card"
                whileHover={{ y: -6 }}
              >

                <h4>{note.title}</h4>
                <p>{note.content.slice(0, 80)}...</p>

              </MotionDiv>

            ))}

          </div>

        </div>

        <MotionButton
          className="logout-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLogout}
        >
          Logout
        </MotionButton>

      </MotionDiv>

    </div>
  );
};

export default UserProfile;