import express from "express";
import noteController from "../controller/note.controller.js";
import auth from "../middleware/auth.middleware.js";

const noteRouter = express.Router();

noteRouter.post("/create", auth, noteController.createNote);
noteRouter.get("/getAll", auth, noteController.getAllNotes);
noteRouter.put("/update/:id", auth, noteController.updateNote);
noteRouter.get("/get/:slug", auth, noteController.getNoteBySlug);
noteRouter.delete("/delete/:id", auth, noteController.deleteNotebySlug);
noteRouter.get("/getUserNotes/:id/:slug", auth, noteController.getUserNotes);

export default noteRouter;