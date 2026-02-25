import jwt from 'jsonwebtoken';


async function identifyUser(req, res, next) {
// console.log("Middleware Chala");

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "User not authenticated",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  

  req.user = decoded; // user data add kar diya request me
  // console.log(req.user);

  next();
}

export default identifyUser;