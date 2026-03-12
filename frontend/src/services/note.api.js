
import axios from "axios";

// axios instance
const api = axios.create({
  baseURL: "https://notes-app-rktm.vercel.app",
});

// 🔐 Automatically attach JWT token to every request
api.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;

}, (error) => {
  return Promise.reject(error);
});


// =============================
// CREATE NOTE
// =============================
export const createNote = async (data) => {
  const res = await api.post("/api/notes/create", data);
  return res.data;
};


// =============================
// GET ALL NOTES (Logged in user)
// =============================
export const getAllNotes = async () => {
  const res = await api.get("/api/notes/getAll");
  return res.data;
};


// =============================
// GET NOTE BY SLUG
// =============================
export const getNoteBySlug = async (slug) => {
  const res = await api.get(`/api/notes/get/${slug}`);
  return res.data;
};


// =============================
// UPDATE NOTE
// =============================
export const updateNote = async (id, data) => {
  const res = await api.put(`/api/notes/update/${id}`, data);
  return res.data;
};


// =============================
// DELETE NOTE
// =============================
export const deleteNote = async (id) => {
  const res = await api.delete(`/api/notes/delete/${id}`);
  return res.data;
};


// =============================
// GET NOTES OF SPECIFIC USER
// =============================
export const getUserNotes = async (id) => {
  const res = await api.get(`/api/notes/user/getUserNotes/${id}`);
  return res.data;
};

export default api;
