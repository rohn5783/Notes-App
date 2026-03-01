import mongoose from "mongoose";
import slugify from "slugify";
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  slug: {
    type: String,
    required: [true, "Slug is required"],
  },
  content: {
    type: String,
    required: [true, "Content is required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

// 🔥 AUTO SLUG GENERATOR
noteSchema.pre("validate", function () {
  if (this.title) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true
    });
  }
  
});




noteSchema.index({user:1, slug:1}, {unique: true});


const Note = mongoose.model("Notes", noteSchema);

export default Note;
