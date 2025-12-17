import { Router } from "express";
import { AuthController } from "../controller/authController.js";

const authRoutes = Router();

authRoutes.post("/auth/register", AuthController.register);
authRoutes.post("/auth/login", AuthController.login);
authRoutes.post("/auth/refresh", AuthController.refreshToken);

export default authRoutes;
