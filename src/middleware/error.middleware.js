// errorMiddleware.js

// Middleware global de tratamento de erros
// Captura todos os erros lançados na aplicação e garante resposta padronizada
const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500; // Define código HTTP, padrão 500 para erros internos

    // Loga o erro no console para análise e debugging
    console.error(`[ERRO ${statusCode}]: ${err.message}`);

    // Retorna resposta JSON padronizada ao cliente
    // Evita expor detalhes sensíveis do erro em produção
    res.status(statusCode).json({
        status: statusCode,
        message: err.message || 'Ocorreu um erro interno no servidor.',
    });
};

export default globalErrorHandler; // Exporta para uso global na aplicação
