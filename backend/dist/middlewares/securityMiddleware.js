import { v4 as uuidv4 } from 'uuid';
import { logger } from '../utils/logger.js';
/**
 * Middleware que aplica cabeçalhos de segurança para proteção contra ataques comuns
 *
 * @param config Configurações de segurança
 */
export const securityHeaders = (config = {}) => {
    // Valores padrão para configurações
    const enableCSP = config.enableCSP ?? (process.env.ENABLE_HELMET?.toLowerCase() === 'true');
    const enableCORS = config.enableCORS ?? true;
    const enableCSRF = (config.enableCSRF ?? (process.env.ENABLE_CSRF?.toLowerCase() === 'true')) || process.env.NODE_ENV === 'production';
    const httpsOnly = config.httpsOnly ?? (process.env.HTTPS_ONLY?.toLowerCase() === 'true');
    return (req, res, next) => {
        // Adicionar ID de requisição para rastreamento
        const requestId = uuidv4();
        res.setHeader('X-Request-ID', requestId);
        // Cabeçalhos de segurança básicos
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-XSS-Protection', '1; mode=block');
        res.setHeader('X-Frame-Options', 'SAMEORIGIN');
        res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
        // HTTPS - Strict Transport Security
        if (httpsOnly) {
            res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
        }
        // Content Security Policy (CSP)
        if (enableCSP) {
            const cspDirectives = [
                "default-src 'self'",
                "script-src 'self' 'unsafe-inline' *.google-analytics.com *.googletagmanager.com",
                "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
                "font-src 'self' fonts.gstatic.com data:",
                "img-src 'self' data: *.google-analytics.com *.googletagmanager.com",
                "connect-src 'self' *.google-analytics.com *.analytics.google.com *.googletagmanager.com",
                "frame-ancestors 'self'",
                "base-uri 'self'"
            ];
            res.setHeader('Content-Security-Policy', cspDirectives.join('; '));
        }
        // CORS simplificado (complementa o middleware cors)
        if (enableCORS) {
            const origin = req.headers.origin;
            const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || ['http://localhost:5173'];
            if (origin && allowedOrigins.includes(origin)) {
                res.setHeader('Access-Control-Allow-Origin', origin);
            }
            res.setHeader('Timing-Allow-Origin', allowedOrigins.join(', '));
        }
        // Proteção contra CSRF
        if (enableCSRF) {
            // Implementação robusta de CSRF
            const csrfToken = uuidv4();
            res.setHeader('X-CSRF-Token', csrfToken);
            // Armazenar em cookies seguros
            res.cookie('csrfToken', csrfToken, {
                httpOnly: true,
                secure: httpsOnly || process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 3600000 // 1 hora
            });
            // Verificar CSRF token para métodos não seguros
            const unsafeMethods = ['POST', 'PUT', 'DELETE', 'PATCH'];
            if (unsafeMethods.includes(req.method) && process.env.NODE_ENV === 'production') {
                const tokenFromHeader = req.headers['x-csrf-token'];
                const tokenFromCookie = req.cookies?.csrfToken;
                if (!tokenFromHeader || !tokenFromCookie || tokenFromHeader !== tokenFromCookie) {
                    logger.warn(`Violação CSRF detectada: token inválido ou ausente para ${req.method} ${req.originalUrl}`);
                    res.status(403).json({ error: 'Falha na validação CSRF' });
                    return;
                }
            }
        }
        // Feature Policy
        res.setHeader('Permissions-Policy', 'camera=(), geolocation=(), microphone=()');
        // Cache para API
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        next();
    };
};
/**
 * Middleware que impede acesso a URLs não encriptadas
 * Redireciona HTTP para HTTPS
 */
export const httpsRedirect = (req, res, next) => {
    if (process.env.NODE_ENV === 'production' && !req.secure && process.env.HTTPS_ONLY?.toLowerCase() === 'true') {
        const host = req.headers.host || '';
        if (!host.includes('localhost')) {
            const httpsUrl = `https://${host}${req.originalUrl}`;
            logger.info(`Redirecionando para HTTPS: ${httpsUrl}`);
            res.redirect(301, httpsUrl);
            return;
        }
    }
    next();
};
/**
 * Middleware que detecta e bloqueia solicitações suspeitas
 * Baseado em heurísticas simples para detectar ataques
 */
export const requestSanitizer = (req, res, next) => {
    try {
        // Verificar tamanho suspeito de corpo da requisição
        const contentLength = parseInt(req.headers['content-length'] || '0', 10);
        if (contentLength > 1024 * 1024 * 10) { // 10 MB
            logger.warn(`Requisição grande bloqueada: ${contentLength} bytes de ${req.ip}`);
            res.status(413).json({ error: 'Payload muito grande' });
            return;
        }
        // Verificar parâmetros suspeitos de SQL Injection
        const suspiciousPatterns = [
            /('|%27)(\s)*(or|OR|Or)(\s)*('|%27)/i,
            /('|%27)(\s)*(and|AND|And)(\s)*('|%27)/i,
            /--(\s)*$/,
            /^(%27|')/i,
            /(%27|')(\s)*$/i,
            /union(\s)+(select|all)/i,
            /exec(\s)+(xp_|sp_)/i
        ];
        // Verificar URL e query params
        const urlString = req.originalUrl;
        for (const pattern of suspiciousPatterns) {
            if (pattern.test(urlString)) {
                logger.warn(`Possível ataque SQL Injection detectado na URL: ${urlString} de ${req.ip}`);
                res.status(403).json({ error: 'Requisição bloqueada por questões de segurança' });
                return;
            }
        }
        // Verificar corpo da requisição
        if (req.body && typeof req.body === 'object') {
            const bodyStr = JSON.stringify(req.body);
            for (const pattern of suspiciousPatterns) {
                if (pattern.test(bodyStr)) {
                    logger.warn(`Possível ataque SQL Injection detectado no corpo: ${bodyStr.slice(0, 100)}... de ${req.ip}`);
                    res.status(403).json({ error: 'Requisição bloqueada por questões de segurança' });
                    return;
                }
            }
        }
        // Verificar se há padrões de XSS
        const xssPatterns = [
            /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
            /on\w+(\s|\t)*=/gi,
            /javascript:/gi
        ];
        // Verificar URL
        for (const pattern of xssPatterns) {
            if (pattern.test(urlString)) {
                logger.warn(`Possível ataque XSS detectado na URL: ${urlString} de ${req.ip}`);
                res.status(403).json({ error: 'Requisição bloqueada por questões de segurança' });
                return;
            }
        }
        // Verificar corpo para XSS
        if (req.body && typeof req.body === 'object') {
            const bodyStr = JSON.stringify(req.body);
            for (const pattern of xssPatterns) {
                if (pattern.test(bodyStr)) {
                    logger.warn(`Possível ataque XSS detectado no corpo: ${bodyStr.slice(0, 100)}... de ${req.ip}`);
                    res.status(403).json({ error: 'Requisição bloqueada por questões de segurança' });
                    return;
                }
            }
        }
        next();
    }
    catch (error) {
        logger.error('Erro no middleware de sanitização:', error);
        next(error);
    }
};
//# sourceMappingURL=securityMiddleware.js.map