import { Router } from "express";
import UserController from "../controller/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import validateSchema from "../middleware/validate.middleware.js";
import { updateUserSchema } from "../schema/user.schema.js";


const userRoutes = Router();
const userController = new UserController();


/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Rotas para gerenciamento de usuários
 */

/**
 * @swagger
 * /users/{email}:
 *   get:
 *     summary: Busca um usuário pelo email
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *       404:
 *         description: Usuário não encontrado
 */
userRoutes.get("/users/:email", userController.getUserByEmail);
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza dados do usuário logado
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *       401:
 *         description: Usuário não autenticado
 *       403:
 *         description: Permissão negada
 *       404:
 *         description: Usuário não encontrado
 */
userRoutes.put("/users/:id",authMiddleware,validateSchema(updateUserSchema), userController.updateUser);
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deleta o usuário logado
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       204:
 *         description: Usuário deletado com sucesso
 *       401:
 *         description: Usuário não autenticado
 *       403:
 *         description: Permissão negada
 *       404:
 *         description: Usuário não encontrado
 */
userRoutes.delete("/users/:id",authMiddleware,userController.deleteUser);

export default userRoutes;
