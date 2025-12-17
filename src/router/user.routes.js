import { Router } from "express";
import UserController from "../controller/userController.js";

const userRoutes = Router();
const userController = new UserController();

userRoutes.get("/users/:email", userController.getUserByEmail);
userRoutes.put("/users/:id", userController.updateUser);
userRoutes.delete("/users/:id", userController.deleteUser);

export default userRoutes;
