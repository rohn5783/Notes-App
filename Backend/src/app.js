import express from "express";
import connectDB from "../config/notes.database.js";
import userRouter from "../routes/user.routes.js";
import noteRouter from "../routes/note.routes.js";
import identifyUser from "../middleware/auth.middleware.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());

app.use(cookieParser());


connectDB();
//  user controller routes

app.use("/api/notes", userRouter);

//  note controller routes
app.use("/api/notes",identifyUser, noteRouter);




export default app;