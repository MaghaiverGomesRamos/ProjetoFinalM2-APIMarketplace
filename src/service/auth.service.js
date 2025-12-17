import prisma from "../config/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthService {

    // Gera token JWT assinado com payload e tempo de expiração
    generateToken(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || "30m" // Tempo de expiração padrão 30 minutos
        });
    }

    // Verifica token JWT e retorna payload decodificado ou null se inválido/expirado
    verifyToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch {
            return null; // Retorna null em caso de token inválido, tratado em refreshToken
        }
    }

    // Renova token JWT
    async refreshToken(token) {
        const payload = this.verifyToken(token);

        if (!payload) {
            throw { status: 401, message: "Token inválido ou expirado" };
        }

        const newToken = this.generateToken({
            id: payload.id,
            role: payload.role
        });

        return { token: newToken };
    }

    // Registra um novo usuário
    async registerUser(userData) {
        const { name, email, password, role } = userData;

        // Validação básica de campos obrigatórios
        if (!name || !email || !password) {
            throw { status: 400, message: "Nome, email e senha são obrigatórios." };
        }

        // Verifica se email já existe (ignorando usuários soft-deletados)
        const emailExists = await prisma.user.findFirst({
            where: { email, deletedAt: null }
        });

        if (emailExists) {
            throw { status: 409, message: "Email já cadastrado." };
        }

        // Hash da senha antes de salvar no banco
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role
            }
        });

        // Gera token JWT para novo usuário
        const token = this.generateToken({
            id: newUser.id,
            role: newUser.role
        });

        // Retorna token e dados do usuário (sem senha)
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

    // Login de usuário
    async loginUser(credentials) {
        const { email, password } = credentials;

        // Busca usuário ativo pelo email
        const user = await prisma.user.findFirst({
            where: { email, deletedAt: null }
        });

        if (!user) {
            throw { status: 401, message: "Email ou senha inválidos." };
        }

        // Compara senha fornecida com hash armazenado
        const senhaValida = await bcrypt.compare(password, user.password);
        if (!senhaValida) {
            throw { status: 401, message: "Email ou senha inválidos." };
        }

        // Gera token JWT para usuário autenticado
        const token = this.generateToken({
            id: user.id,
            role: user.role
        });

        // Retorna token e dados do usuário (sem senha)
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

export default AuthService; // Exporta classe de serviço de autenticação
