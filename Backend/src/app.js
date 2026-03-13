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

// ===== CORS =====
const corsOrigins = (process.env.CORS_ORIGIN || "https://notes-app-2-8e4i.onrender.com")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// ===== API Routes =====
app.use("/api/notes", userRouter);
app.use("/api/notes", identifyUser, noteRouter);

// ===== Serve React Frontend =====
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// ===== Catch-all route for React Router =====
// Serve React frontend for all non-API routes
app.use((req, res, next) => {
  // Agar request /api se start hoti hai, next() call karo
  if (req.path.startsWith("/api")) return next();

  // Otherwise serve React index.html
  res.sendFile(path.join(__dirname, "/frontend/dist/index.html"));
});

export default app;