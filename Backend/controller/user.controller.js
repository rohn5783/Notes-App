import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import redis from "../config/cache.js";

// REGISTER
async function createUser(req, res) {
  const { userName, email, password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password required" });
  }

  const user = await User.findOne({ $or: [{ userName }, { email }] });

  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    userName,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    message: "User created successfully",
  
  });
  // console.log(user)
}

// LOGIN
async function loginUser(req, res) {
  try {
    const { userName, email, password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password required" });
    }

    const user = await User.findOne({
      $or: [{ userName }, { email }],
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Password is incorrect",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token);

    res.status(200).json({
      message: "User logged in successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function logoutUser(req, res) {
  const token = req.cookies.token;
  res.clearCookie("token");
  await redis.set( token, Date.now().toString(),"EX",3600);
  res.status(200).json({
    message: "User logged out successfully",
  });
}

export default { createUser, loginUser, logoutUser };
