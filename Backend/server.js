import app from "./src/app.js";
import dotenv from "dotenv";

dotenv.config();

app.get("/", (req, res) => {
  res.send("Api is running ");
});

app.listen(3000, () => {  
  console.log("Server is running on port 3000");
})