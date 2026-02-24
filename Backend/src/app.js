import express from "express";
import connectDB from "../config/notes.database.js";
import userRouter from "../routes/user.routes.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());


connectDB();
//  user controller routes
//  user registration route
app.use("/api/notes", userRouter);
//  user login route
app.use("/api/notes", userRouter);

export default app;