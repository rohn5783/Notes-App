import app from "./src/app.js";
import cookieParser from "cookie-parser";

app.use(cookieParser());

app.listen(3000, ()=> {
    console.log("Server is running on port 3000");
})

