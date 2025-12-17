import { PrismaClient } from "../generated/prisma/index.js";

// Cria uma instância do PrismaClient
// Permite comunicação com o banco de dados
const prisma = new PrismaClient();

export default prisma; // Exporta a instância para ser usada nos services e controllers
