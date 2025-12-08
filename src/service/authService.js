import { prisma } from "../config/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthService {

    async login(email, password) {
        const user = await prisma.user.findFirst({
            where: { email, deletedAt: null }
        });

        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        const senhaValida = await bcrypt.compare(password, user.password);
        if (!senhaValida) {
            throw new Error("Senha inválida");
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "30m" }
        );

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        };
    }
}

export default AuthService;
