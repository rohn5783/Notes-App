import express from "express";
import connectDB from "../config/notes.database.js";
import userRouter from "../routes/user.routes.js";
import noteRouter from "../routes/note.routes.js";
import identifyUser from "../middleware/auth.middleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(express.json());

app.use(cookieParser());


connectDB();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
//  user controller routes

app.use("/api/notes", userRouter);

//  note controller routes
app.use("/api/notes",identifyUser, noteRouter);




export default app;