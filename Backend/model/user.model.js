import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  email: {
    type: String,
    unique: [true, "Email already exists"],
  },
  password: String,
  profilePic: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("Users", userSchema);

export default User;
