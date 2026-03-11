import app from "./src/app.js";
import redis from "./config/cache.js";

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
app.get("/", (req, res) => {
  res.send("Api is running ");
});