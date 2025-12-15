import { prisma } from "../config/database.js";
import bcrypt from "bcrypt";
//
class UserService {

  async getUserByEmail(email) {
    const user = await prisma.user.findFirst({
      where: {
        email,
        deletedAt: null
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

  async updateUser(id, loggedUserId, data) {
    if (id !== loggedUserId) {
      return null;
    }

    const updateData = {};
    const { name, email, password } = data;

    if (name) updateData.name = name;
    if (email) updateData.email = email;

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData
    });

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role
    };
  }

  async deleteUser(id, loggedUserId) {
    if (id !== loggedUserId) {
      return null;
    }

    await prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date()
      }
    });

    return true;
  }
}

export default UserService;
