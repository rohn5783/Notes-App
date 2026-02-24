import jwt from 'jsonwebtoken';


async function identifyUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "User not authenticated",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decoded; // user data add kar diya request me

  next();
}

export default identifyUser;