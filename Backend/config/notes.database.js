import mongoose  from "mongoose";
import dotenv from "dotenv";
dotenv.config();


function connectDB(){
mongoose.connect(process.env.MONGO_URI).then(()=> {
    console.log("Connected to the database");
})
}


export default connectDB;