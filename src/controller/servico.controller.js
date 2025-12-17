import ServicoService from "../service/servico.service.js";
import { priceSchema, updatePriceSchema } from "../schema/zodSchema.js";

class ServicoController {

    // Cria um novo serviço vinculado ao provider logado
    static async create(req, res) {
        const providerId = req.user.id; // ID do usuário autenticado
        const { price } = priceSchema.parse(req.body); // Valida e extrai o preço usando Zod
        const data = { ...req.body, price, providerId }; // Junta dados do corpo com providerId

        // Chama o serviço responsável por criar o registro no DB
        const service = await ServicoService.createService(data);

        res.status(201).json(service); // Retorna o serviço criado
    }

    // Atualiza um serviço existente
    static async update(req, res) {
        const { id } = req.params;
        const serviceId = parseInt(id); // Converte ID para número
        const userId = req.user.id;
        const { price } = updatePriceSchema.parse(req.body); // Valida atualização de preço
        const data = {
            ...req.body,
            ...(price !== undefined && { price }), // Só adiciona price se definido
        };

        // Atualiza serviço apenas se o usuário for dono
        const updated = await ServicoService.updateService(serviceId, data, userId);

        res.status(200).json(updated); // Retorna serviço atualizado
    }

    // Exclui (soft delete) um serviço
    static async delete(req, res) {
        const { id } = req.params;
        const serviceId = parseInt(id);
        const userId = req.user.id;

        // Chama serviço que aplica soft delete apenas se for dono
        const deleted = await ServicoService.deleteService(serviceId, userId);

        res.status(200).json({ message: "Serviço deletado com sucesso!" });
    }

    // Restaura um serviço previamente deletado
    static async restore(req, res) {
        const { id } = req.params;
        const serviceId = parseInt(id);
        const userId = req.user.id;

        // Chama serviço que restaura o registro
        const restored = await ServicoService.restoreService(serviceId, userId);

        res.status(200).json(restored);
    }

    // Lista todos os serviços com paginação
    static async getAll(req, res) {
        const { page, limit } = req.query;

        // Define valores padrão caso query não seja informada
        const services = await ServicoService.getAllService(
            Number(page) || 1,
            Number(limit || 10)
        );

        res.status(200).json(services);
    }

    // Lista serviços de um provider específico com paginação
    static async getProvider(req, res) {
        const providerId = req.params.providerId;
        const { page, limit } = req.query;

        const services = await ServicoService.getServiceByUser(
            providerId,
            Number(page) || 1,
            Number(limit) || 10
        );

        res.status(200).json(services);
    }
}

export default ServicoController;
