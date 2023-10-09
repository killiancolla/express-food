import express from "express";
import User from "../controller/userController.js";
import { isAuth, isAdmin } from "../auth/authentification.js";

const userRouter = express.Router();

userRouter.get("/", isAuth, isAdmin, User.getAllUsers);
userRouter.get("/:id", isAuth, isAdmin, User.getUserById);
userRouter.post("/signin/:mail", User.getUserByMail);
userRouter.post("/register", isAuth, isAdmin, User.createUser);
userRouter.put("/:id", isAuth, User.updateUser);
userRouter.put("/delete/:id", isAuth, isAdmin, User.deleteUser);

export default userRouter;
