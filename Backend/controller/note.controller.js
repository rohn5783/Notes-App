import { select } from "three/tsl";
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
async function updateNote (req, res) {
  try {
    const { slug } = req.params;
    const { title, content } = req.body;

    const updatedSlug = title
      ? slugify(title, { lower: true, strict: true })
      : slug;

    const updatedNote = await Note.findOneAndUpdate(
      {
        user: req.user.id,
        slug: slug
      },
      {
        title,
        content,
        slug: updatedSlug
      },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(updatedNote);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function getNoteBySlug(req,res){
  const note = await Note.findOne({
    user: req.user.id,
    slug: req.params.slug
  }).populate({path:"user",select:"-password"});

  if (!note) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json({
    message : "notes fetched successfully",
    note
  });
}






//  get all notes of a user

async function getAllNotes(req, res) {
  const notes = await Note.find({ user: req.user.id }).populate({path:"user",select:"-password"})
  res.status(200).json({
    message: "All notes fetched successfully",
    notes,
  });
}

export default { createNote, getAllNotes, updateNote,getNoteBySlug };
