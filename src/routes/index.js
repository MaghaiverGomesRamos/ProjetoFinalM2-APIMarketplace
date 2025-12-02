import { Router } from "express";
import authRoutes from "./authRoutes.js"
import userRoutes from "./userRoutes.js"
import serviceRoutes from "./authRoutes.js"

const router = Router();

router.use("auth", authRoutes);
router.use("users", userRoutes);
router.use("services", serviceRoutes);

export default router;