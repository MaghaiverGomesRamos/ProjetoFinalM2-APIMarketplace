import { Router } from "express";
import ServicoController from "../controller/ServicoController.js";

const servicoRoutes = Router();

servicoRoutes.post("/servicos", ServicoController.create);
servicoRoutes.put("/servicos/:id", ServicoController.update);
servicoRoutes.delete("/servicos/:id", ServicoController.delete);
servicoRoutes.patch("/servicos/:id/restore", ServicoController.restore);
servicoRoutes.get("/servicos", ServicoController.getAll);
servicoRoutes.get("/servicos/provider/:providerId", ServicoController.getProvider);

export default servicoRoutes;
