import UserService from "../service/user.service.js";

const userService = new UserService(); // Instancia o serviço que contém a lógica de usuário

class UserController {

  // Busca usuário pelo e-mail fornecido na URL
  async getUserByEmail(req, res) {
    const { email } = req.params;
    
    console.log("DEBUG - Email recebido na URL:", email) // Log temporário para debug

    // Chama o serviço que busca usuário no DB pelo e-mail
    const user = await userService.getUserByEmail(email);

    // Caso usuário não exista, lança erro 404
    if (!user) {
      throw { status: 404, message: "Usuário não encontrado" };
    }

    // Prepara resposta filtrando apenas campos essenciais
    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role 
    }

    res.status(200).json(userResponse); // Retorna dados do usuário
  }

  // Atualiza dados de um usuário
  async updateUser(req, res) {
    const { id } = req.params; // ID do usuário que será atualizado
    const loggedUserId = req.user.id; // ID do usuário logado (autorização)
    const data = req.body; // Dados a serem atualizados

    // Chama serviço que atualiza o usuário, garantindo que o usuário logado tenha permissão
    const updated = await userService.updateUser(id, loggedUserId, data);

    // Resposta filtrada para não expor dados sensíveis
    const userResponse = {
      id: updated.id,
      name: updated.name,
      email: updated.email,
      role: updated.role
    }

    res.status(200).json(userResponse);
  }

  // Deleta um usuário
  async deleteUser(req, res) {
    const { id } = req.params; // ID do usuário a ser deletado
    const loggedUserId = req.user.id; // Garantia de que apenas usuário autorizado pode deletar

    // Chama serviço que realiza a exclusão (soft ou hard delete, dependendo da implementação)
    const deleted = await userService.deleteUser(id, loggedUserId);

    res.status(200).json({ message: "Usuário deletado com sucesso"}); // Retorna confirmação da ação
  }
}

export default UserController;
