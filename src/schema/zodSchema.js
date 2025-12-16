import { z } from "zod";

export const priceSchema = z.object({
    price: z.preprocess((value) => {
        if (typeof value === "string") {
            const normalized = value.replace(",", ".");
            const parsed = Number(normalized);

            return Number.isNaN(parsed) ? undefined : parsed;
        }

        return value;
    },
        z.number({
            required_error: "Preço é obrigatório",
            invalid_type_error: "Preço inválido",
        })
            .positive("Preço deve ser maior que zero")
            .refine(
                (value) => Number.isInteger(value * 100),
                { message: "Preço deve ter no máximo 2 casas decimais" }
            )
    ),
});

export const updatePriceSchema = z.object({
    price: priceSchema.shape.price.optional(),
});