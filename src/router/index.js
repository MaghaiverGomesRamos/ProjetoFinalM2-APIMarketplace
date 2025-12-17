import { Router } from "express";

import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import servicoRoutes from "./servico.routes.js";

const router = Router();

router.use(authRoutes);
router.use(userRoutes);
router.use(servicoRoutes);

export default router;
