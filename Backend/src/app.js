import express from "express";
import connectDB from "../config/notes.database.js";
import userRouter from "../routes/user.routes.js";
import noteRouter from "../routes/note.routes.js";
import identifyUser from "../middleware/auth.middleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

connectDB();

// SIMPLE CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",        
      "https://notes-app-seven-peach.vercel.app"  
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/notes", userRouter);
app.use("/api/notes", identifyUser, noteRouter);

export default app;