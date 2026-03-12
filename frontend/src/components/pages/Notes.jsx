import React, { useState } from "react";
import "../styles/notes.scss";
import { useNavigate } from "react-router-dom";
import { useNotes } from "../../auth/hooks/useNotes";


const Notes = () => {
  const navigate = useNavigate();

  const { notes, addNote, editNote, removeNote, loading } = useNotes();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editSlug, setEditSlug] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) return;

    try {
      if (editSlug) {
        await editNote(editSlug, { title, content });
        setEditSlug(null);
      } else {
        await addNote({ title, content });
      }

      setTitle("");
      setContent("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (slug) => {
    await removeNote(slug);
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditSlug(note._id);
  };

  return (
    <div className="notes-page">
      <div className="notes-container">

        <h2>Manage Notes</h2>

        {/* NEW BUTTON */}

       <button
  className="get-notes-btn"
  onClick={() => window.location.reload()}
>
  Refresh Notes
</button>

        {/* form */}

        <form onSubmit={handleSubmit} className="note-form">

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note..."
          />

          <button type="submit">
            {editSlug ? "Update Note" : "Add Note"}
          </button>

        </form>


        {/* notes list */}

        <div className="notes-list">
          {loading ? (
            <p>Loading notes...</p>
          ) : (
            notes?.map((note) => (
              <div key={note._id} className="note-card">

                <h3>{note.title}</h3>

                <p>{note.content}</p>

                <div className="note-actions">

                  <button onClick={() => handleEdit(note)}>
                    Edit
                  </button>

                  <button onClick={() => handleDelete(note._id)}>
                    Delete
                  </button>

                </div>

              </div>
            ))
          )}
        </div>


        <button
          className="back-btn"
          onClick={() => navigate("/profile")}
        >
          Back to Profile
        </button>

      </div>
    </div>
  );
};

export default Notes;