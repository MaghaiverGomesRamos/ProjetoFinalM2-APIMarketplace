import { Router } from "express";

import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import servicoRoutes from "./servico.routes.js";

const router = Router();

// Centraliza todas as rotas da aplicação
// Permite importar um único router no app principal (ex: app.js ou server.js)
router.use(authRoutes);    // Rotas de autenticação (login, registro, refresh token)
router.use(userRoutes);    // Rotas de gerenciamento de usuários (CRUD)
router.use(servicoRoutes); // Rotas de gerenciamento de serviços (CRUD, listagem, restore)

export default router; // Exporta o router principal para uso no app
