import prisma from "../config/database.js";
import ServiceMiddleware from "../middleware/serviceMiddleware.js";

class ServicoService {

  static async createService(data) {
    const role = await ServiceMiddleware.verificarRole(data.providerId)
    const priceFormated = Number(
      data.price.replace('.', '').replace(',', '.')
    );

    if (role !== "PROVIDER") {
      throw new Error("Permissão negada: Somente usuários PROVIDERS podem criar serviços.");
    }

    console.log("Serviço criado com sucesso!");
    return prisma.service.create({
      data: {
        title: data.title,
        description: data.description ?? null,
        price: priceFormated,
        providerId: data.providerId,
      },
    });
  }

  static async updateService(id, data, userId) {
    const { providerId, id: _, deletedAt, createdAt, updatedAt, ...dadosPermitidos } = data;
    const servico = await prisma.service.findUnique({ where: { id } });
    const role = await ServiceMiddleware.verificarRole(userId);

    if (!servico || servico.deletedAt) {
      return null;
    }

    if (dadosPermitidos.price !== undefined && dadosPermitidos.price !== null) {
      dadosPermitidos.price = Number(
        dadosPermitidos.price.replace('.', '').replace(',', '.')
      );
    }

    if (role !== "PROVIDER" || servico.providerId !== userId) {
      throw new Error("Permissão negada: Você não pode editar este serviço.");
    }

    console.log("Serviço atualizado com sucesso!");
    return prisma.service.update({
      where: { id },
      data: dadosPermitidos,
    });
  }

  static async DeleteService(id, userId) {
    const servico = await prisma.service.findUnique({ where: { id } });
    const role = await ServiceMiddleware.verificarRole(userId);

    if (!servico || servico.deletedAt) {
      return null
    };

    if (role !== "PROVIDER" || servico.providerId !== userId) {
      throw new Error("Permissão negada: Você não pode deletar este serviço.");
    }

    console.log("Serviço deletado com sucesso!");
    return prisma.service.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  static async restoreService(id, userId) {
    const servico = await prisma.service.findUnique({ where: { id } });
    const role = await ServiceMiddleware.verificarRole(userId);

    if (!servico || !servico.deletedAt) {
      return null
    };

    if (role !== "PROVIDER" || servico.providerId !== userId) {
      throw new Error("Permissão negada: Você não pode restaurar este serviço.");
    }

    console.log("Serviço restaurado com sucesso!");
    return prisma.service.update({
      where: { id },
      data: { deletedAt: null },
    });
  }

  static async getAllService() {
    const allServices = await prisma.service.findMany({
      where: {
        deletedAt: null
      }
    })
    console.log(allServices);
    return allServices
  }

  static async getServiceByUser(providerId) {
    const services = await prisma.service.findMany({
      where: {
        providerId,
        deletedAt: null,
      }
    })

    console.log(services);
    return services
  }
}

export default ServicoService;