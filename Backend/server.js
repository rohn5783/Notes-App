import app from "./src/app.js";
import cookieParser from "cookie-parser";
import redis from "./config/cache.js";
app.use(cookieParser());

app.listen(3000, ()=> {
    console.log("Server is running on port 3000");
})

