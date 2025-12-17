import { z } from "zod";

// Schema para criação de um novo serviço
// Valida que título e preço estejam corretos antes de chegar ao controller
export const createServiceSchema = z.object({
  title: z.string()
    .min(3, "Título obrigatório"), // Título obrigatório com mínimo de 3 caracteres
  description: z.string()
    .optional(), // Descrição é opcional
  price: z.number()
    .positive("Preço deve ser maior que zero") // Garante que o preço seja positivo
});

// Schema para atualização de serviço
// Permite atualização parcial, mas exige que ao menos um campo seja informado
export const updateServiceSchema = z.object({
  title: z.string()
    .min(3)
    .optional(), // Atualização de título é opcional
  description: z.string()
    .optional(), // Atualização de descrição é opcional
  price: z.number()
    .positive()
    .optional() // Atualização de preço é opcional
}).refine(
  data => Object.keys(data).length > 0, // Garante que pelo menos um campo seja enviado
  { message: "Informe ao menos um campo para atualização" } // Mensagem de erro caso nenhum campo seja enviado
);
