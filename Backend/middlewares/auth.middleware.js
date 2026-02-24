import jwt from "jsonwebtoken";


// async function identifyUser(req, res, next){
//      const token = jwt.sign({
//     id: user._id
//   },process.env.JWT_SECRET,{expiresIn: "1h"},
// );
//   res.cookie("token", token);
// }

async function identifyUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send("User not authenticated");
  }
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      message: "User not authenticated",
    });
  }
  req.user = decoded;
  next();
}

export default identifyUser;
