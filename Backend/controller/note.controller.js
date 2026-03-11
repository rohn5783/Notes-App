
import mongoose from "mongoose";
import Note from "../model/notes.model.js";
import slugify from "slugify";

//  create note
async function createNote(req, res) {
  const { title, content } = req.body;

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

//

//  user can update their note
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      req.body,
      { returnDocument: "after" }
    );

    if (!updatedNote) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.json(updatedNote);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
async function getNoteBySlug(req, res) {
  const note = await Note.findOne({
    user: req.user.id,
    slug: req.params.slug,
  }).populate({ path: "user", select: "-password" });

  if (!note) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json({
    message: "notes fetched successfully",
    note,
  });
}

//  get all notes of a user

async function getAllNotes(req, res) {
  const notes = await Note.find({ user: req.user.id }).populate({
    path: "user",
    select: "-password",
  });
  res.status(200).json({
    message: "All notes fetched successfully",
    notes,
  });
}

//  delete note by slug
async function deleteNotebySlug(req,res) {
  const note = await Note.findOneAndDelete({
    user: req.user.id,
    _id: req.params.id,
    
  }).populate({ path: "user", select: "-password" });
  
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }
  
  res.json({
    message: "Note deleted successfully",
    
  })
  
}


//  get user specific notes

async function  getUserNotes(req,res) {
  const {id,slug} = req.params;
  const notes = await Note.find({user:id}).populate({path:"user",select:"-password"});
  res.status(200).json({
    message:"All notes fetched successfully",
    notes,
  })
}




export default { createNote, getAllNotes, updateNote, getNoteBySlug, deleteNotebySlug,getUserNotes };
