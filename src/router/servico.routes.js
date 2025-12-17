import { Router } from "express";
import ServicoController from "../controller/servico.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import validateSchema from "../middleware/validate.middleware.js";
import { createServiceSchema, updateServiceSchema } from "../schema/servico.schema.js";

const servicoRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: Serviços
 *   description: Rotas para gerenciamento de serviços
 */

/**
 * @swagger
 * /servicos:
 *   post:
 *     summary: Cria um novo serviço
 *     tags: [Serviços]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateService'
 *     responses:
 *       201:
 *         description: Serviço criado com sucesso
 *       401:
 *         description: Usuário não autenticado
 *       403:
 *         description: Usuário não tem permissão
 */
servicoRoutes.post("/servicos", authMiddleware, roleMiddleware(["PROVIDER"]), validateSchema(createServiceSchema), ServicoController.create);
/**
 * @swagger
 * /servicos/{id}:
 *   put:
 *     summary: Atualiza um serviço
 *     tags: [Serviços]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do serviço
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateService'
 *     responses:
 *       200:
 *         description: Serviço atualizado com sucesso
 *       401:
 *         description: Usuário não autenticado
 *       403:
 *         description: Usuário não tem permissão
 *       404:
 *         description: Serviço não encontrado
 */
servicoRoutes.put("/servicos/:id", authMiddleware, roleMiddleware(["PROVIDER"]), validateSchema(updateServiceSchema), ServicoController.update);
/**
 * @swagger
 * /servicos/{id}:
 *   delete:
 *     summary: Deleta um serviço (soft delete)
 *     tags: [Serviços]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do serviço
 *     responses:
 *       204:
 *         description: Serviço deletado com sucesso
 *       401:
 *         description: Usuário não autenticado
 *       403:
 *         description: Usuário não tem permissão
 *       404:
 *         description: Serviço não encontrado
 */
servicoRoutes.delete("/servicos/:id", authMiddleware, roleMiddleware(["PROVIDER"]), ServicoController.delete);
/**
 * @swagger
 * /servicos/{id}/restore:
 *   patch:
 *     summary: Restaura um serviço deletado
 *     tags: [Serviços]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do serviço
 *     responses:
 *       200:
 *         description: Serviço restaurado com sucesso
 *       401:
 *         description: Usuário não autenticado
 *       403:
 *         description: Usuário não tem permissão
 *       404:
 *         description: Serviço não encontrado ou não está deletado
 */
servicoRoutes.patch("/servicos/:id/restore", authMiddleware, roleMiddleware(["PROVIDER"]), ServicoController.restore);
/**
 * @swagger
 * /servicos:
 *   get:
 *     summary: Lista todos os serviços
 *     tags: [Serviços]
 *     responses:
 *       200:
 *         description: Lista de serviços
 */
servicoRoutes.get("/servicos", ServicoController.getAll);
/**
 * @swagger
 * /servicos/provider/{providerId}:
 *   get:
 *     summary: Lista serviços de um provider
 *     tags: [Serviços]
 *     parameters:
 *       - in: path
 *         name: providerId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do provider
 *     responses:
 *       200:
 *         description: Lista de serviços do provider
 */
servicoRoutes.get("/servicos/provider/:providerId", ServicoController.getProvider);

export default servicoRoutes;