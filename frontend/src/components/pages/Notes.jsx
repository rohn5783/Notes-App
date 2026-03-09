import React, { useState } from "react";
import "../styles/notes.scss";
import { useNavigate } from "react-router-dom";

const Notes = () => {

  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) return;

    if (editId) {

      const updated = notes.map((note) =>
        note.id === editId
          ? { ...note, title, content }
          : note
      );

      setNotes(updated);
      setEditId(null);

    } else {

      const newNote = {
        id: Date.now(),
        title,
        content
      };

      setNotes([...notes, newNote]);
    }

    setTitle("");
    setContent("");
  };

  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note.id);
  };

  return (
    <div className="notes-page">

      <div className="notes-container">

        <h2>Manage Notes</h2>

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
            {editId ? "Update Note" : "Add Note"}
          </button>

        </form>

        {/* notes list */}

        <div className="notes-list">

          {notes.map((note) => (

            <div key={note.id} className="note-card">

              <h3>{note.title}</h3>
              <p>{note.content}</p>

              <div className="note-actions">

                <button onClick={() => handleEdit(note)}>
                  Edit
                </button>

                <button onClick={() => handleDelete(note.id)}>
                  Delete
                </button>

              </div>

            </div>

          ))}

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