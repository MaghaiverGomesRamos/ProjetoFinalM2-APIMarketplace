// Middleware de validação de dados usando Zod
// Permite validar qualquer propriedade da requisição (body, query, params) usando schemas pré-definidos
const validateSchema = (schema, property = "body") => {
  return (req, res, next) => {
    try {
      // Valida e transforma os dados da requisição de acordo com o schema
      const parsedData = schema.parse(req[property]);
      
      // Substitui os dados originais pelos validados/parseados
      req[property] = parsedData;
      
      next(); // Continua para o próximo middleware/controller
    } catch (error) {
      // Lança erro padronizado em caso de falha na validação
      // Concatena todas as mensagens de erro do Zod
      throw {
        status: 400,
        message: error.errors?.map(err => err.message).join(", ") || "Dados inválidos"
      };
    }
  };
};

export default validateSchema; // Exporta para uso em rotas, garantindo validação consistente
