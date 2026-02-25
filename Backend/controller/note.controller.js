import jwt from "jsonwebtoken";
import Note from "../model/notes.model.js";


//  create note
async function createNote(req, res){
   const {title, content} = req.body;

   const note = await Note.create({
       title,
       content,
       user: req.user.id,
   });
// console.log(user)
   res.status(201).json({
       message: "Note created successfully",
       note,
   });
}

//  get all notes

async function getAllNotes(req,res){
    const notes = await Note.find({user: req.user.id}).populate("user").select("-password");
    res.status(200).json({
        message: "All notes fetched successfully",
        notes,
    });
}


export default {createNote, getAllNotes};