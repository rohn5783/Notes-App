import app from "./src/app.js";
import redis from "./config/cache.js";

const PORT = process.env.PORT || 3000;

// connect redis
redis.on("connect", () => {
  console.log("Redis connected successfully");
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});