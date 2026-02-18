import mongoose from "mongoose";


const noteSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: [true, "username is required"]
    },
    email:{
        type: String,
        unique: [true, "username is required"]

    },
    password:String,
    profilePic: {
        type: String,
        default: ""
    }
    
})



const note = mongoose.model("note", noteSchema);

export default note;