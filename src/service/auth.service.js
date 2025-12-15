import { prisma } from "../config/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthService {

    generateToken(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || "30m"
        });
    }

    verifyToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch {
            return null;
        }
    }

    async refreshToken(token) {
        const payload = this.verifyToken(token);

        if (!payload) {
            throw new Error("Token inválido ou expirado");
        }

        const newToken = this.generateToken({
            id: payload.id,
            role: payload.role
        });

        return { token: newToken };
    }

    async registerUser(userData) {
        const { name, email, password } = userData;

        if (!name || !email || !password) {
            throw new Error("Nome, email e senha são obrigatórios.");
        }

        const emailExists = await prisma.user.findFirst({
            where: { email, deletedAt: null }
        });

        if (emailExists) {
            throw new Error("Email já cadastrado.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        const token = this.generateToken({
            id: newUser.id,
            role: newUser.role
        });

        return {
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        };
    }

    async loginUser(credentials) {
        const { email, password } = credentials;

        const user = await prisma.user.findFirst({
            where: { email, deletedAt: null }
        });

        if (!user) {
            throw new Error("Usuário não encontrado.");
        }

        const senhaValida = await bcrypt.compare(password, user.password);
        if (!senhaValida) {
            throw new Error("Senha inválida.");
        }

        const token = this.generateToken({
            id: user.id,
            role: user.role
        });

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
