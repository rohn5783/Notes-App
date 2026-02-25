import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
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

})

const Note = mongoose.model("Notes", noteSchema);

export default Note;