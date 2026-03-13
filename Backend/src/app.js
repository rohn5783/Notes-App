// backend/app.js

import express from "express";
import connectDB from "../config/notes.database.js";
import userRouter from "../routes/user.routes.js";
import noteRouter from "../routes/note.routes.js";
import identifyUser from "../middleware/auth.middleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();
connectDB();

const __dirname = path.resolve();

// CORS
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/notes", userRouter);
app.use("/api/notes", identifyUser, noteRouter);

// serve frontend
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// react router support
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/dist/index.html"));
});

export default app;