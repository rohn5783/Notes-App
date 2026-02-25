import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";

// REGISTER
async function createUser(req, res) {
  try {
    const { userName, email, password, profilePic } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const isUserExists = await User.findOne({
      $or: [{ userName }, { email }],
    });

    if (isUserExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      userName,
      email,
      password: hash,
      profilePic,
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(201).json({
      message: "User registered successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token);

    res.status(200).json({
      message: "User logged in successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export default { createUser, loginUser };