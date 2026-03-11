import app from "./src/app.js";
import dotenv from "dotenv";
import redis from "./config/cache.js";

dotenv.config();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
app.get("/", (req, res) => {
  res.send("Api is running ");
});