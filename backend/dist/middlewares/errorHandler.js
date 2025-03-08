import { logError } from '../utils/logger.js';
/**
 * Middleware para tratamento centralizado de erros da API
 * Registra erros e envia respostas apropriadas para o cliente
 */
export const errorHandler = (err, req, res, _next) => {
    const statusCode = err.statusCode || 500;
    // Registrar erro no sistema de log
    logError(err, {
        path: req.path,
        method: req.method,
        ip: req.ip,
        userAgent: req.get('user-agent'),
        query: req.query,
        body: req.method !== 'GET' ? req.body : undefined,
    });
    // Em ambiente de produção, não expor detalhes internos de erros
    const isProduction = process.env.NODE_ENV === 'production';
    const errorResponse = {
        error: {
            message: err.message || 'Erro interno do servidor',
            code: err.code || 'INTERNAL_ERROR',
            ...(err.errors && { details: err.errors }),
            ...(isProduction ? {} : { stack: err.stack }),
        },
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
    };
    res.status(statusCode).json(errorResponse);
};
//# sourceMappingURL=errorHandler.js.map