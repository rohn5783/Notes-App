import express from "express";
import connectDB from "../config/notes.database.js";
import userRouter from "../routes/user.routes.js";
const app = express();
app.use(express.json());

connectDB();

app.use("/api/notes", userRouter);

export default app;