import prisma from "../config/database.js";

class ServicoService {

  // Cria um novo serviço
  // Apenas usuários com role PROVIDER podem criar
  static async createService(data) {
    const role = await prisma.user.findUnique({
      where: { id: data.providerId },
      select: { role: true }
    });

    if (role.role !== "PROVIDER") {
      throw { status: 403, message: "Permissão negada: Somente usuários PROVIDERS podem criar serviços." };
    }

    // Cria serviço vinculado ao provider
    return prisma.service.create({
      data: {
        title: data.title,
        description: data.description ?? null,
        price: data.price,
        provider: { connect: { id: data.providerId } },
      },
    });
  }

  // Atualiza um serviço existente
  // Verifica se o serviço existe, se não está deletado e se o usuário logado tem permissão
  static async updateService(id, data, userId) {
    const { providerId, id: _, deletedAt, createdAt, updatedAt, ...dadosPermitidos } = data;

    const servico = await prisma.service.findUnique({ where: { id } });
    const role = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    });

    if (!servico || servico.deletedAt) {
      throw { status: 404, message: "Serviço não encontrado." };
    }

    if (role.role !== "PROVIDER" || servico.providerId !== userId) {
      throw { status: 403, message: "Permissão negada: Você não pode editar este serviço." };
    }

    return prisma.service.update({
      where: { id },
      data: dadosPermitidos,
    });
  }

  // Deleta um serviço (soft delete)
  // Apenas o provider dono do serviço pode deletar
  static async deleteService(id, userId) {
    const servico = await prisma.service.findUnique({ where: { id } });
    const role = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    });

    if (!servico || servico.deletedAt) {
      throw { status: 404, message: "Serviço não encontrado." };
    }

    if (role.role !== "PROVIDER" || servico.providerId !== userId) {
      throw { status: 403, message: "Permissão negada: Você não pode deletar este serviço." };
    }

    return prisma.service.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  // Restaura um serviço deletado
  // Apenas o provider dono do serviço pode restaurar
  static async restoreService(id, userId) {
    const servico = await prisma.service.findUnique({ where: { id } });
    const role = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    });

    if (!servico || !servico.deletedAt) {
      throw { status: 404, message: "Serviço não encontrado ou não está deletado." };
    }

    if (role.role !== "PROVIDER" || servico.providerId !== userId) {
      throw { status: 403, message: "Permissão negada: Você não pode restaurar este serviço." };
    }

    return prisma.service.update({
      where: { id },
      data: { deletedAt: null },
    });
  }

  // Lista todos os serviços ativos com paginação
  static async getAllService(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [services, total] = await Promise.all([
      prisma.service.findMany({
        where: { deletedAt: null },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" }
      }),
      prisma.service.count({ where: { deletedAt: null } })
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

  // Lista serviços de um provider específico com paginação
  static async getServiceByUser(providerId, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [services, total] = await Promise.all([
      prisma.service.findMany({
        where: { providerId, deletedAt: null },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" }
      }),
      prisma.service.count({ where: { providerId, deletedAt: null } })
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

export default ServicoService; // Exporta serviço de gerenciamento de serviços
