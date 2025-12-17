import { z } from "zod";

// Schema de validação para registro de usuários
// Garante integridade e formato correto dos dados antes de chegar ao controller
export const registerSchema = z.object({
  name: z.string()
    .min(3, "Nome deve ter ao menos 3 caracteres"), // Valida tamanho mínimo do nome
  email: z.string()
    .email("Email inválido"), // Valida formato de email
  password: z.string()
    .min(6, "Senha deve ter no mínimo 6 caracteres"), // Valida tamanho mínimo da senha
  role: z.enum(["USER", "PROVIDER"]) // Garante que o role seja apenas um dos valores permitidos
});

// Schema de validação para login de usuários
// Apenas email e senha são obrigatórios
export const loginSchema = z.object({
  email: z.string()
    .email("Email inválido"), // Valida formato de email
  password: z.string()
    .min(1, "Senha é obrigatória") // Garante que a senha não esteja vazia
});
