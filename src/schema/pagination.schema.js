import { z } from "zod";

// Schema para validação de parâmetros de paginação (query params)
// Converte automaticamente valores para number e aplica limites mínimos/máximos
export const paginationSchema = z.object({
  page: z.coerce.number() // Converte valores string para number automaticamente
    .min(1, "Página mínima é 1") // Não permite valores menores que 1
    .default(1), // Valor padrão caso não seja informado
  limit: z.coerce.number() // Converte string para number
    .min(1, "Limite mínimo é 1") // Limite mínimo de itens por página
    .max(50, "Limite máximo é 50") // Limita quantidade máxima de itens por página
    .default(10) // Valor padrão caso não seja informado
});
