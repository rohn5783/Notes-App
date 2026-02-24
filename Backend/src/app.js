import express from "express";
import connectDB from "../config/notes.database.js";
import userRouter from "../routes/user.routes.js";
import identifyUser from "../middleware/auth.middleware.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());

app.use(cookieParser());


connectDB();
//  user controller routes
//  user registration route
app.use("/api/notes",identifyUser, userRouter);
//  user login route
app.use("/api/notes",identifyUser, userRouter);

export default app;