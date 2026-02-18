import express from "express";
import connectDB from "../config/notes.database.js";

const app = express();
app.use(express.json());

connectDB();



export default app;