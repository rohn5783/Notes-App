import express from 'express';
import noteController from '../controller/note.controller.js';

const noteRouter = express.Router();

noteRouter.post("/create", noteController.createNote);
noteRouter.get("/getAll", noteController.getAllNotes);
noteRouter.patch("/update/:slug", noteController.updateNote);
noteRouter.get("/get/:slug", noteController.getNoteBySlug)


export default noteRouter;
