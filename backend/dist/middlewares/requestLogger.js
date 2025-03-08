import { logApiRequest } from '../utils/logger.js';
import { v4 as uuidv4 } from 'uuid';
/**
 * Middleware para registro detalhado de requisições da API
 * Adiciona um ID de rastreamento único a cada requisição
 * e registra dados para analytics
 */
export const requestLogger = (req, res, next) => {
    // Adiciona um ID de rastreamento único para a requisição
    const requestId = uuidv4();
    req.headers['x-request-id'] = requestId;
    // Captura o timestamp inicial
    const startTime = Date.now();
    // Adiciona informações à resposta para ajudar no rastreamento
    res.setHeader('X-Request-ID', requestId);
    // Captura informações para marketing e analytics
    const referer = req.headers.referer || req.headers.referrer || '';
    const source = req.query.utm_source || req.headers['x-marketing-source'] || '';
    // Função que será executada após a resposta ser enviada
    res.on('finish', () => {
        const responseTime = Date.now() - startTime;
        const statusCode = res.statusCode;
        const userAgent = req.headers['user-agent'] || '';
        // Registra a requisição
        logApiRequest(req.method, req.originalUrl || req.url, statusCode, responseTime, userAgent, req.headers['x-user-id']);
        // Registra dados adicionais para analytics se for uma referência externa ou marketing
        if (referer || source) {
            // Aqui você poderia adicionar lógica para registrar conversões
            // ou outras métricas importantes para marketing e SEO
        }
    });
    next();
};
//# sourceMappingURL=requestLogger.js.map