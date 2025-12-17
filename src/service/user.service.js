import prisma from "../config/database.js";
import bcrypt from "bcrypt";

class UserService {

  // Busca usuário ativo pelo email
  // Retorna apenas campos essenciais, sem incluir senha
  async getUserByEmail(email) {
    const user = await prisma.user.findFirst({
      where: {
        email: email.trim(), // Remove espaços extras
        deletedAt: null       // Ignora usuários soft-deletados
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    });

    return user;
  }

  // Atualiza usuário logado
  // Apenas o próprio usuário pode se atualizar
  async updateUser(id, loggedUserId, data) {
    const user = await prisma.user.findFirst({
      where: { id, deletedAt: null }
    });

    if (!user) {
      throw { status: 404, message: "Usuário não encontrado" };
    }

    if (id !== loggedUserId) {
      throw { status: 403, message: "Você não tem permissão para atualizar este usuário" };
    }

    // Constrói dados permitidos para atualização
    const updateData = {};
    const { name, email, password } = data;

    if (name) updateData.name = name;
    if (email) updateData.email = email;

    // Hash da senha antes de atualizar
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData
    });

    // Retorna apenas dados essenciais, sem senha
    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role
    };
  }

  // Soft delete de usuário
  // Apenas o próprio usuário pode se deletar
  async deleteUser(id, loggedUserId) {
    const user = await prisma.user.findFirst({
      where: { id, deletedAt: null },
    });

    if (!user) {
      throw { status: 404, message: "Usuário não encontrado" };
    }

    if (id !== loggedUserId) {
      throw { status: 403, message: "Você não tem permissão para deletar este usuário" };
    }

    // Atualiza campo deletedAt para soft delete
    await prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date()
      }
    });

    return true; // Indica sucesso da operação
  }
}

export default UserService; // Exporta serviço de gerenciamento de usuários
