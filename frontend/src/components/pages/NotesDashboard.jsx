import { useEffect, useState } from "react";
import {
  createNote,
  getAllNotes,
  updateNote,
  deleteNote,
} from "../../services/note.api";

import { useNavigate } from "react-router-dom";

import "../styles/notesDashboard.scss";

export default function NotesDashboard() {

  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  // fetch notes
  const fetchNotes = async () => {
    try {
      const data = await getAllNotes();
      setNotes(data.notes || data);
    } catch (error) {
      console.log(error);
    }
  };

  // add or update note
  const handleSaveNote = async () => {
    try {

      if (!title || !content) return;

      if (editingId) {

        const updated = await updateNote(editingId, {
          title,
          content,
        });

        const updatedList = notes.map((note) =>
          note._id === editingId ? updated.note : note
        );

        setNotes(updatedList);
        setEditingId(null);

      } else {

        const data = await createNote({
          title,
          content,
        });

        setNotes([data.note, ...notes]);

      }

      setTitle("");
      setContent("");

    } catch (error) {
      console.log(error);
    }
  };

  // delete note
  const handleDelete = async (id) => {
    try {

      await deleteNote(id);

      const filtered = notes.filter((note) => note._id !== id);

      setNotes(filtered);

    } catch (error) {
      console.log(error);
    }
  };

  // edit note
  const handleEdit = (note) => {

    setTitle(note.title);
    setContent(note.content);
    setEditingId(note._id);

  };

  // search filter
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="notes-dashboard">

      <div className="notes-container">

        <h1 className="notes-title">Manage Notes</h1>


        {/* SEARCH */}

        <input
          className="note-input"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />


        {/* FORM */}

        <div className="note-form">

          <input
            className="note-input"
            type="text"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="note-textarea"
            placeholder="Write your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            className="btn btn-add"
            onClick={handleSaveNote}
          >
            {editingId ? "Update Note" : "Add Note"}
          </button>

        </div>


        {/* NOTES LIST */}

        <div className="notes-list">

          {filteredNotes.map((note) => (

            <div key={note._id} className="note-card">

              <h3>{note.title}</h3>

              <p>{note.content}</p>

              <div className="note-actions">

                <button
                  className="btn btn-edit"
                  onClick={() => handleEdit(note)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-delete"
                  onClick={() => handleDelete(note._id)}
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>


        {/* BACK BUTTON */}

        <button
          className="btn btn-back"
          onClick={() => navigate("/profile")}
        >
          Back to Profile
        </button>

      </div>

    </div>
  );
}