import express from 'express';

import userController from '../controller/user.controller.js';
import identifyUser from '../middleware/auth.middleware.js';

const userRouter = express.Router();

userRouter.post("/register", userController.createUser);
userRouter.post("/login", userController.loginUser);
userRouter.post("/logout", userController.logoutUser);
userRouter.get("/get/:id",identifyUser, userController.getUserById);

export default userRouter;