import { z } from "zod";

// Schema para atualização de usuário
// Permite atualização parcial, mas exige que ao menos um campo seja enviado
export const updateUserSchema = z.object({
  name: z.string()
    .min(3)
    .optional(), // Nome opcional, mínimo 3 caracteres
  email: z.string()
    .email()
    .optional(), // Email opcional, deve estar em formato válido
  password: z.string()
    .min(6)
    .optional() // Senha opcional, mínimo 6 caracteres
}).refine(
  data => Object.keys(data).length > 0, // Garante que pelo menos um campo seja fornecido
  { message: "Informe ao menos um campo para atualização" } // Mensagem de erro caso nenhum campo seja enviado
);
