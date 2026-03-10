import React from "react";
import "../styles/userProfile.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import { useNotes } from "../../auth/hooks/useNotes";
import { motion } from "framer-motion";

const UserProfile = () => {

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

      <motion.div
        className="profile-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >

        {/* Profile Header */}

        <div className="profile-header">

          <motion.div
            className="avatar"
            whileHover={{ scale: 1.1 }}
          >
            {user?.name?.charAt(0)?.toUpperCase()}
          </motion.div>

          <div className="user-info">
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
          </div>

        </div>

        {/* Notes Section */}

        <div className="notes-section">

          <div className="notes-header">

            <h3>Your Notes</h3>

            <motion.button
              className="add-note-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/notes")}
            >
              + Add Note
            </motion.button>

          </div>

          <div className="notes-grid">

            {loading && <p className="empty">Loading notes...</p>}

            {!loading && previewNotes.length === 0 && (
              <p className="empty">No notes yet.</p>
            )}

            {!loading && previewNotes.map((note) => (

              <motion.div
                key={note._id}
                className="note-card"
                whileHover={{ y: -6 }}
              >

                <h4>{note.title}</h4>
                <p>{note.content.slice(0, 80)}...</p>

              </motion.div>

            ))}

          </div>

        </div>

        <motion.button
          className="logout-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLogout}
        >
          Logout
        </motion.button>

      </motion.div>

    </div>
  );
};

export default UserProfile;