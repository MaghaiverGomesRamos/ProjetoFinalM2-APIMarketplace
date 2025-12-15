import ServicoService from "../service/servico.service.js";
import { priceSchema, updatePriceSchema } from "../schema/zodSchema.js";

class ServicoController {
    static async create(req, res) {
        const providerId = req.user.id;
        const { price } = priceSchema.parse(req.body);
        const data = { ...req.body, price, providerId };

        const service = await ServicoService.createService(data);

        res.status(201).json(service);
    }

    static async update(req, res) {
        const { id } = req.params;
        const userId = req.user.id;
        const { price } = updatePriceSchema.parse(req.body);
        const data = {
            ...req.body,
            ...(price !== undefined && { price }),
        };

        const updated = await ServicoService.updateService(id, data, userId);

        if (!updated) {
            throw { status: 404, message: "Serviço não encontrado" };
        }

        res.status(200).json(updated);
    }

    static async delete(req, res) {
        const { id } = req.params;
        const userId = req.user.id;

        const deleted = await ServicoService.deleteService(id, userId);

        if (!deleted) {
            throw { status: 404, message: "Serviço não encontrado" };
        }

        res.status(200).json({ message: "Serviço deletado com sucesso!" });
    }

    static async restore(req, res) {
        const { id } = req.params;
        const userId = req.user.id;

        const restored = await ServicoService.restoreService(id, userId);

        if (!restored) {
            throw { status: 404, message: "Serviço não encontrado ou não está deletado" };
        }

        res.status(200).json(restored);
    }

    static async getAll(req, res) {
        const { page, limit } = req.query;

        const services = await ServicoService.getAllService(
            Number(page),
            Number(limit)
        );

        res.status(200).json(services);
    }

    static async getProvider(req, res) {
        const providerId = req.params.providerId;

        const { page, limit } = req.query;

        const services = await ServicoService.getServiceByUser(providerId, Number(page), Number(limit));

        if (!services) {
            throw { status: 404, message: "Serviço não encontrado" };
        }

        res.status(200).json(services);
    }
}

export default ServicoController;