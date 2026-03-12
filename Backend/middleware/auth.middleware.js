import jwt from "jsonwebtoken";
import redis from "../config/cache.js";

export default async function auth(req, res, next) {
  try {

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - Token missing"
      });
    }

    // check blacklist (logout tokens)
    let isBlacklisted = false;
    try {
      isBlacklisted = Boolean(await redis.get(token));
    } catch {
      isBlacklisted = false;
    }

    if (isBlacklisted) {
      return res.status(401).json({
        message: "Unauthorized - Token expired"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      message: "Invalid token"
    });

  }
}