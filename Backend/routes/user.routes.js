import express from 'express';

import userController from '../controller/user.controller.js';
import identifyUser from '../middlewares/auth.middleware.js';

const userRouter = express.Router();

userRouter.post("/create",identifyUser, userController.createUser);
userRouter.get("/login",identifyUser, userController.loginUser);

export default userRouter;