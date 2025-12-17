// errorMiddleware.js
const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    console.error(`[ERRO ${statusCode}]:${err.message}`, err.stack);

    res.status(statusCode).json({
        status: 'error',
        statusCode: statusCode,
        message: err.message || 'Ocorreu um erro interno no servidor.',
    });
};

export default globalErrorHandler;