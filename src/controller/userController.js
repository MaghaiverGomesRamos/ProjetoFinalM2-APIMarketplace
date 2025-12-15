import UserService from "../service/userService.js";

const userService = new UserService();

class UserController {
  async getUserByEmail(req, res) {
    const { email } = req.params;

    const user = await userService.getUserByEmail(email);

    if (!user) {
      throw { status: 404, message: "Usuário não encontrado" };
    }

    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role 
    }

    res.status(200).json(userResponse);
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const loggedUserId = req.user.id;
    const data = req.body;

    const updated = await userService.updateUser(id, loggedUserId, data);

    if (!updated) {
      throw { status: 403, message: "Você não tem permissão para editar este usuário" };
    }

    const userResponse = {
      id: updated.id,
      name: updated.name,
      email: updated.email,
      role: updated.role
    }

    res.status(200).json(userResponse);
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    const loggedUserId = req.user.id;

    const deleted = await userService.deleteUser(id, loggedUserId);

    if (!deleted){
        throw { status: 403, message: "Você não tem permissão para deletar este usuario"};
    }

    res.status(204).json({ message: "Usuário deletado com sucesso"});
  }
}

export default UserController;
