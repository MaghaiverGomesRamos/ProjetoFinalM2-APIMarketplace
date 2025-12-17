import { z } from "zod";

// Schema para validação de preço em criação de serviço
export const priceSchema = z.object({
    price: z.preprocess(
        (value) => {
            // Permite que o valor venha como string com vírgula ou ponto
            if (typeof value === "string") {
                const normalized = value.replace(",", "."); // Substitui vírgula por ponto
                const parsed = Number(normalized); // Converte para number

                return Number.isNaN(parsed) ? undefined : parsed; // Retorna undefined se não for número válido
            }
            return value; // Se já for number, mantém o valor
        },
        z.number({
            required_error: "Preço é obrigatório", // Mensagem caso campo não fornecido
            invalid_type_error: "Preço inválido",   // Mensagem caso não seja number
        })
        .positive("Preço deve ser maior que zero") // Garante preço positivo
        .refine(
            (value) => Number.isInteger(value * 100), // Garante no máximo 2 casas decimais
            { message: "Preço deve ter no máximo 2 casas decimais" }
        )
    ),
});

// Schema para atualização de preço
// Permite update parcial, reutilizando o mesmo priceSchema e tornando opcional
export const updatePriceSchema = z.object({
    price: priceSchema.shape.price.optional(),
});
