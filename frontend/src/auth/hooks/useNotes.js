import { useState, useEffect } from "react";
import {
  createNote,
  getAllNotes,
  getNoteBySlug,
  updateNote,
  deleteNote,
  getUserNotes,
} from "../../services/note.api";

export const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // get all notes
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const data = await getAllNotes();
      setNotes(data.notes);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // create note
  const addNote = async (noteData) => {
    try {
      setLoading(true);
      await createNote(noteData);
      await fetchNotes(); // refresh notes
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // update note
  const editNote = async (slug, noteData) => {
    try {
      setLoading(true);
      await updateNote(slug, noteData);
      await fetchNotes();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // delete note
  const removeNote = async (slug) => {
    try {
      setLoading(true);
      await deleteNote(slug);
      await fetchNotes();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // get single note
  const fetchNote = async (slug) => {
    try {
      setLoading(true);
      const data = await getNoteBySlug(slug);
      return data.note;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // auto load notes
  useEffect(() => {
    fetchNotes();
  }, []);

  return {
    notes,
    loading,
    error,
    fetchNotes,
    addNote,
    editNote,
    removeNote,
    fetchNote,
    getUserNotes,
  };
};
