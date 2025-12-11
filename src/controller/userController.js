import UserService from "../service/userService.js";

const userService = new UserService();

class UserController {
  async getUserByEmail(req, res) {
    const { email } = req.paramns;

    const user = await userService.getUserByEmail(email);

    if (!user) {
      throw { status: 404, message: "Usuario não encontrado" };
    }

    res.status(200).json(user);
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const loggedUserId = req.user.id;
    const data = req.body;

    const updated = await userService.updateUser(id, loggedUserId, data);

    if (!updated) {
      throw { status: 403, message: "Você não tem permissão para editar este usuário" };
    }

    res.status(200).json(updated);
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    const loggedUserId = req.user.id;

    const deleted = await userService.deleteUser(id, loggedUserId);

    if (!deleted){
        throw { status: 403, message: "Você não tem permissão para deletar este usuario"};
    }

    res.status(200).json({ message: "Usuário deletado com sucesso"});
  }
}

export default UserController;
