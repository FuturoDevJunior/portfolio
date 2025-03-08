import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import compression from 'compression';
import { rateLimit } from 'express-rate-limit';
import { sitemapRouter } from './routes/sitemap.js';
import { analyticsRouter } from './routes/analytics.js';
import { marketingRouter } from './routes/marketing.js';
import { seoRouter } from './routes/seo.js';
import { apiRouter } from './routes/api.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { requestLogger } from './middlewares/requestLogger.js';
import { securityHeaders, httpsRedirect, requestSanitizer } from './middlewares/securityMiddleware.js';
import { domainRedirectMiddleware } from './middlewares/domainRedirect.js';
import { configurePrerender } from './utils/prerender.js';
import { setupSwagger } from './utils/swagger.js';
import { logger } from './utils/logger.js';
import { botDetectionMiddleware, BotDetectionRequest } from './utils/botDetection.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';

// Obter o dirname no ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carregar variáveis de ambiente
dotenv.config();

// Configurações
const app = express();
const PORT = process.env.PORT || 3001;

// Redirecionamento para HTTPS (em produção)
app.use(httpsRedirect);

// Middlewares essenciais
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));
app.use(cookieParser(process.env.COOKIE_SECRET || 'development_cookie_secret'));

// Middleware de segurança personalizado
app.use(securityHeaders({
    enableCSP: process.env.ENABLE_HELMET?.toLowerCase() === 'true',
    enableCSRF: process.env.ENABLE_CSRF?.toLowerCase() === 'true',
    httpsOnly: process.env.HTTPS_ONLY?.toLowerCase() === 'true',
}));

// Sanitização de requisições para prevenir ataques
app.use(requestSanitizer);

// CORS
app.use(cors({
    origin: [
        'https://www.devferreirag.com',
        'https://www.devferreirag.com.br',
        'https://devferreirag.com',
        'https://devferreirag.com.br',
        'http://localhost:5173',
        'http://localhost:5174'
    ],
    methods: process.env.CORS_METHODS?.split(',') || ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: process.env.CORS_ALLOWED_HEADERS?.split(',') || ['Content-Type', 'Authorization', 'X-API-KEY', 'X-Analytics-ID', 'X-Marketing-Source'],
    credentials: true,
    maxAge: Number(process.env.CORS_MAX_AGE) || 86400
}));

// Redirecionamento de domínio (para garantir consistência entre .com e .com.br)
app.use(domainRedirectMiddleware({
    enabled: process.env.NODE_ENV === 'production',
    primaryDomain: 'www.devferreirag.com',
    excludePaths: ['/api', '/health', '/api-docs', '/sitemap.xml', '/robots.txt']
}));

// Configuração de segurança com Helmet
if (process.env.ENABLE_HELMET?.toLowerCase() === 'true') {
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", "*.google-analytics.com", "*.googletagmanager.com"],
                styleSrc: ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
                fontSrc: ["'self'", "fonts.gstatic.com", "data:"],
                imgSrc: ["'self'", "data:", "*.google-analytics.com", "*.googletagmanager.com"],
                connectSrc: ["'self'", "*.google-analytics.com", "*.analytics.google.com", "*.googletagmanager.com"]
            }
        },
        crossOriginResourcePolicy: { policy: "cross-origin" }
    }));
}

// Compressão para melhorar performance
if (process.env.ENABLE_COMPRESSION?.toLowerCase() === 'true') {
    app.use(compression({
        level: Number(process.env.COMPRESSION_LEVEL) || 6,
        threshold: 1024, // 1kb
        filter: (req, res) => {
            // Não comprimir respostas para requisições com header 'x-no-compression'
            if (req.headers['x-no-compression']) {
                return false;
            }
            // Usar o filter padrão do Express para comprimir
            return compression.filter(req, res);
        }
    }));
}

// Logging
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(requestLogger);

// Detecção de bots para ajuste de respostas (exceto para rotas específicas)
app.use((req, res, next) => {
    // Não aplicar a detecção de bots em rotas de monitoramento e recursos estáticos
    if (req.path === '/health' || req.path.startsWith('/public/') || req.path.startsWith('/js/')) {
        return next();
    }
    botDetectionMiddleware(req, res, next);
});

// Rate limiting
const standardRateLimitOptions = {
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 900000, // 15 minutos por padrão
    max: Number(process.env.RATE_LIMIT_MAX) || 100, // Limite de requisições por IP
    standardHeaders: true,
    legacyHeaders: false,
    trustProxy: process.env.RATE_LIMIT_ENABLE_TRUSTED_PROXY?.toLowerCase() === 'true',
    skipFailedRequests: process.env.RATE_LIMIT_SKIP_FAILED_REQUESTS?.toLowerCase() === 'true'
};

// Configurar rate limit padrão
const limiter = rateLimit(standardRateLimitOptions);

// Configurar rate limit mais restritivo para rotas sensíveis
const strictLimiter = rateLimit({
    ...standardRateLimitOptions,
    windowMs: Number(process.env.RATE_LIMIT_STRICT_WINDOW_MS) || 3600000, // 1 hora por padrão
    max: Number(process.env.RATE_LIMIT_STRICT_MAX) || 10, // Muito mais restritivo
    message: 'Muitas requisições de um mesmo IP, por favor tente novamente mais tarde.'
});

// Aplicar rate limit padrão globalmente
app.use(limiter);

// Aplicar rate limit estrito em rotas sensíveis
app.use('/api/analytics/metrics', strictLimiter);
app.use('/api/marketing/stats', strictLimiter);
app.use('/api/admin', strictLimiter);

// Servir arquivos estáticos
const staticOptions = {
    maxAge: Number(process.env.STATIC_FILES_MAX_AGE) || 2592000 * 1000, // 30 dias em milissegundos
    etag: process.env.ENABLE_ETAGS?.toLowerCase() === 'true',
    lastModified: true,
    setHeaders: (res: express.Response) => {
        res.setHeader('Cache-Control', 'public, max-age=2592000');
        res.setHeader('X-Content-Type-Options', 'nosniff');
    }
};

app.use('/public', express.static(path.join(__dirname, '..', 'public'), staticOptions));
app.use('/js', express.static(path.join(__dirname, 'public', 'js'), staticOptions));
app.use('/sitemap.xml', express.static(path.join(__dirname, '..', 'public', 'sitemap.xml'), staticOptions));
app.use('/robots.txt', express.static(path.join(__dirname, '..', 'public', 'robots.txt'), staticOptions));

// Rotas principais
app.use('/api', apiRouter);
app.use('/sitemap', sitemapRouter);
app.use('/analytics', analyticsRouter);
app.use('/marketing', marketingRouter);
app.use('/seo', seoRouter);

// Rota de saúde para monitoramento
app.get('/health', (req: BotDetectionRequest, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'DevFerreiraG API',
        version: process.env.npm_package_version || '1.0.0',
        environment: process.env.NODE_ENV,
        uptime: process.uptime(),
        isBot: req.isBot || false,
        botType: req.botType
    });
});

// Middleware de tratamento de erros
app.use(errorHandler);

// Função para iniciar o servidor
const startServer = async () => {
    try {
        // Configuração para prerender (SEO para SPAs)
        await configurePrerender(app);

        // Documentação da API
        setupSwagger(app);

        // Iniciar o servidor
        app.listen(PORT, () => {
            logger.info(`✨ Servidor rodando na porta ${PORT}`);
            logger.info(`🌎 Ambiente: ${process.env.NODE_ENV || 'development'}`);
            logger.info(`📚 Documentação da API disponível em http://localhost:${PORT}/api-docs`);
        });
    } catch (error) {
        logger.error('Erro ao iniciar o servidor:', error);
        process.exit(1);
    }
};

// Iniciar o servidor
startServer().catch(error => {
    logger.error('Erro fatal ao iniciar a aplicação:', error);
    process.exit(1);
});

export default app; 