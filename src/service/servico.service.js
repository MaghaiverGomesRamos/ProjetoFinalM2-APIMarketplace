import prisma from "../config/database.js";

class ServicoService {

  static async createService(data) {
    const role = await prisma.user.findUnique({
      where: { id: data.providerId },
      select: { role: true }
    })

    if (role.role !== "PROVIDER") {
      throw new Error("Permissão negada: Somente usuários PROVIDERS podem criar serviços.");
    }

    console.log("Serviço criado com sucesso!");
    return prisma.service.create({
      data: {
        title: data.title,
        description: data.description ?? null,
        price: data.price,
        providerId: data.providerId,
      },
    });
  }

  static async updateService(id, data, userId) {
    const { providerId, id: _, deletedAt, createdAt, updatedAt, ...dadosPermitidos } = data;
    const servico = await prisma.service.findUnique({ where: { id } });
    const role = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    })

    if (!servico || servico.deletedAt) {
      return null;
    }

    if (role.role !== "PROVIDER" || servico.providerId !== userId) {
      throw new Error("Permissão negada: Você não pode editar este serviço.");
    }

    console.log("Serviço atualizado com sucesso!");
    return prisma.service.update({
      where: { id },
      data: dadosPermitidos,
    });
  }

  static async deleteService(id, userId) {
    const servico = await prisma.service.findUnique({ where: { id } });
    const role = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    })

    if (!servico || servico.deletedAt) {
      return null
    };

    if (role.role !== "PROVIDER" || servico.providerId !== userId) {
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
    const role = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    })

    if (!servico || !servico.deletedAt) {
      return null
    };

    if (role.role !== "PROVIDER" || servico.providerId !== userId) {
      throw new Error("Permissão negada: Você não pode restaurar este serviço.");
    }

    console.log("Serviço restaurado com sucesso!");
    return prisma.service.update({
      where: { id },
      data: { deletedAt: null },
    });
  }

  static async getAllService(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [services, total] = await Promise.all([
      prisma.service.findMany({
        where: { deletedAt: null },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" }
      }),
      prisma.service.count({
        where: { deletedAt: null }
      })
    ]);

    console.log({
      data: services,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    })

    return {
      data: services,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  static async getServiceByUser(providerId, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [services, total] = await Promise.all([
      prisma.service.findMany({
        where: {
          providerId,
          deletedAt: null,
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" }
      }),
      prisma.service.count({
        where: {
          providerId,
          deletedAt: null,
        }
      })
    ]);

    return {
      data: services,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
}

export default ServicoService; 