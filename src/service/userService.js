import { prisma } from "../config/database.js";
import bcrypt from "bcrypt";

class UserService {
    async getUserByEmail(email) {
        const user = await prisma.user.findFirst({
            where: { email, deletedAt: null }
        });

        return user; 
    }

    async updateUser(id, loggedUserId, data) {
        if (id !== loggedUserId) {
            return null;
        }

        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        const updated = await prisma.user.update({
            where: { id },
            data
        });

        return updated;
    }

    async deleteUser(id, loggedUserId) {
        if (id !== loggedUserId) {
            return null;
        }

        const deleted = await prisma.user.update({
            where: { id },
            data: { deletedAt: new Date() }
        });

        return deleted;
    }
}

export default UserService;
