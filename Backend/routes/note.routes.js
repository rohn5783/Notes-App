import express from 'express';
import noteController from '../controller/note.controller.js';

const noteRouter = express.Router();

noteRouter.post("/create", noteController.createNote);
noteRouter.get("/getAll", noteController.getAllNotes);

export default noteRouter;
