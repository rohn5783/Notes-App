import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();


const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  lazyConnect: true,
});


redis.on("connect", () => {
    console.log("Redis is connected")
})

redis.on("error", (err) => {
    console.log("Redis error", err)
})

export default redis;