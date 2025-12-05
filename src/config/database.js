import { PrismaClient } from "../generated/prisma/index.js";
//import bcrypt from "bcrypt"

const prisma =new PrismaClient();

//async function createUser(data) {
//    try {
//        const { name, email, password, role } = data;
//
//        // Verificar se o e-mail já existe
//        const existingUser = await prisma.user.findUnique({
//            where: { email }
//        });
//
//        if (existingUser) {
//            return { error: "E-mail já cadastrado." };
//        }
//
//       // Criptografar senha
//        const hashedPassword = await bcrypt.hash(password, 10);
//
//        // Criando o usuário
//        const user = await prisma.user.create({
//            data: {
//                name,
//                email,
//                password: hashedPassword,
//                role: role ?? "USER" // default
//            },
//            select: {
//                id: true,
//                name: true,
//                email: true,
//                role: true,
//                createdAt: true
//            }
//        });
//
//        return user;
//
//    } catch (err) {
//        console.error("Erro ao criar usuário:", err);
//        return { error: "Erro interno ao criar usuário." };
//    }
//}
//
//const usuario={
//        name: "Jhon",
//        email: "jhon@gmail.com",
//        password: "senha123",
//        role: "USER"
//    }
//
//async function getUser(){
//    const user = await prisma.user.findMany()
//
//    console.log(user)
//}

//createUser(usuario)

//getUser()

export default prisma