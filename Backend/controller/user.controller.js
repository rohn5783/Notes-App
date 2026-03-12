import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import redis from "../config/cache.js";
//  Register
async function createUser(req, res) {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    userName,
    email,
    password: hashedPassword,
  });

  console.log(newUser);

  res.status(201).json({
    message: "User created successfully",
    user: {
      _id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
      profilePic: newUser.profilePic,
    },
  });
}

// LOGIN
async function loginUser(req, res) {

  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  // find user
  const user = await User.findOne({
    $or: [{ email: email }, { userName: email }],
  });

  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  // compare password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({
      message: "Password is incorrect",
    });
  }

const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);



res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000
});

res.status(200).json({
  message: "User logged in successfully",
  user: {
    _id: user._id,
    userName: user.userName,
    email: user.email,
    profilePic: user.profilePic,
  },
});
}
//  logout 
async function logoutUser(req, res) {
  const token = req.cookies?.token;
  const isProd = process.env.NODE_ENV === "production";

  res.clearCookie("token", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
  });

  if (token) {
    try {
      await redis.set(token, Date.now().toString(), "EX", 3600);
    } catch {
      // If Redis isn't available, logout still works by clearing cookie.
    }
  }
  res.status(200).json({
    message: "User logged out successfully",
  });
}

//  get user by id
async function getUserById(req,res) {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    message:"User fetched successfully",
    user
  })
}

async function getMe(req, res) {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json({
    message: "User fetched successfully",
    user,
  });
}

export default { createUser, loginUser, logoutUser, getUserById, getMe };
