import express from "express";
import router from "./router/index.routes.js";
import globalErrorHandler from "./middleware/error.middleware.js";
import setupSwagger from "./swagger.config.js";

const app = express();

// Middleware para parsear JSON nas requisições
app.use(express.json());

// Rota raiz simples para verificar se o servidor está ativo
app.get("/", (req, res) => {
    res.json({ message: "Bem vindo ao servidor." });
});

// Centraliza todas as rotas da aplicação
app.use(router);

// Configuração do Swagger para documentação de API
setupSwagger(app);

// Middleware global de tratamento de erros
// Captura erros lançados em qualquer rota ou middleware
app.use(globalErrorHandler);

export default app; // Exporta app configurado para uso no server.js ou testes
