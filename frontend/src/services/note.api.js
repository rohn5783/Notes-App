import axios from 'axios';
 const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
 })


 // create note
export const createNote = async (data) => {
  const res = await api.post("/api/notes/create", data);
  return res.data;
};

// get all notes (logged in user)
export const getAllNotes = async () => {
  const res = await api.get("/api/notes/getAll");
  return res.data;
};

// get single note by slug
export const getNoteBySlug = async (slug) => {
  const res = await api.get(`/api/notes/get/${slug}`);
  return res.data;
};

// update note
export const updateNote = async (slug, data) => {
  const res = await api.put(`/api/notes/update/${slug}`, data);
  return res.data;
};

// delete note
export const deleteNote = async (slug) => {
  const res = await api.delete(`/api/notes/delete/${slug}`);
  return res.data;
};

// get notes of specific user
export const getUserNotes = async (id) => {
  const res = await api.get(`/api/notes/user/getUserNotes/${id}`);
  return res.data;
};