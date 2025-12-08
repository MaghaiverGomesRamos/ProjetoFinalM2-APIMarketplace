import prisma from "../config/database.js";

export default class ServiceMiddleware {

    static async verificarRole(id) {
        try {
            const user = await prisma.user.findUnique({
                where: { id },
                select: { role: true }
            });

            if (!user) {
                throw new Error("Usuário não encontrado.");
            }

            return user.role;
        } catch (error) {
            console.error("Erro ao verificar role:", error.message);
            return null;
        }
    }
}