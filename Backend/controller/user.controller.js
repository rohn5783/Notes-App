import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
//  user registration
async function createUser(req, res) {
  const { userName, email, password, profilePic } = req.body;
  User({ userName, email, password });
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
    profilePic
  })
  res.status(201).json({
    message: "User registered successfully"
  })
  const token = jwt.sign({
    id: id._user
  },process.env.JWT_SECRET,{expiresIn: "1h"},
);
res.cookie("token", token);
res.status(200).json({
  message: "User registered successfully",
  
});
}


//  user login


async function loginUser(req, res) {
  const user = await User.findOne({
    $or: [{ userName: req.body.userName }, { email: req.body.email }],
  })
  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }
  const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({
      message: "Password is incorrect",
    });
  }
  const token = jwt.sign({
    id: user._id
  },process.env.JWT_SECRET,{expiresIn: "1h"},
);
  res.cookie("token", token);
  res.status(200).json({
    message: "User logged in successfully",
  })

}





export default {
  createUser, loginUser
}


