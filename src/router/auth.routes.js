import { Router } from "express";
import { AuthController } from "../controller/auth.controller.js";
import validateSchema from "../middleware/validate.middleware.js";
import { registerSchema, loginSchema} from "../schema/auth.schema.js";
import authMiddleware from "../middleware/auth.middleware.js";

const authRoutes = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Cadastra um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Dados obrigatórios não fornecidos
 *       409:
 *         description: Email já cadastrado
 */
authRoutes.post("/auth/register", validateSchema(registerSchema),AuthController.register);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza login de um usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Email ou senha inválidos
 */
authRoutes.post("/auth/login", validateSchema(loginSchema),AuthController.login);
/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Renova o token JWT
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token renovado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefreshTokenResponse'
 *       401:
 *         description: Token não fornecido ou inválido
 */
authRoutes.post("/auth/refresh", authMiddleware, AuthController.refreshToken);

export default authRoutes;
