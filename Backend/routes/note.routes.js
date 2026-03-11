import express from "express";
import noteController from "../controller/note.controller.js";


const noteRouter = express.Router();
noteRouter.post("/create", noteController.createNote);
noteRouter.get("/getAll", noteController.getAllNotes);
noteRouter.put("/update/:id", noteController.updateNote);
noteRouter.get("/get/:slug", noteController.getNoteBySlug);
noteRouter.delete("/delete/:id", noteController.deleteNotebySlug);

export default noteRouter;