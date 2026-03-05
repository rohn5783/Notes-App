import express from 'express';

import userController from '../controller/user.controller.js';
// import identifyUser from '../middlewares/auth.middleware.js';

const userRouter = express.Router();

userRouter.post("/register", userController.createUser);
userRouter.post("/login", userController.loginUser);
userRouter.post("/logout", userController.logoutUser);

export default userRouter;