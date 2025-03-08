/**
 * Utilitário para detecção de bots e crawlers
 * Permite adaptar a resposta do servidor com base na origem da solicitação
 */
import { Request, Response, NextFunction } from 'express';
import { logger } from './logger.js';

// Estender a interface Request com tipagem de módulo
export interface BotDetectionRequest extends Request {
    isBot?: boolean;
    botType?: string;
}

// Lista de assinaturas de user-agent de bots conhecidos
const KNOWN_BOTS = [
    // Motores de busca principais
    'googlebot',
    'bingbot',
    'yandexbot',
    'duckduckbot',
    'baiduspider',
    'bytespider',
    'sogou',

    // Bots de redes sociais
    'facebookexternalhit',
    'twitterbot',
    'linkedinbot',
    'whatsapp',
    'telegrambot',
    'slackbot',
    'discordbot',
    'pinterest',
    'tumblr',
    'skype',

    // Validadores e ferramentas
    'validator',
    'w3c',
    'lighthouse',
    'pagespeed',
    'pingdom',
    'gtmetrix',

    // Crawlers comuns
    'ahrefsbot',
    'semrushbot',
    'mj12bot',
    'screaming',
    'rogerbot',
    'dotbot',

    // Previewers
    'prerender',
    'headless',
    'chrome-lighthouse',
    'embedly',
    'quora link preview',
    'outbrain',

    // Arquivadores
    'ia_archiver', // Internet Archive
    'archive.org_bot',
    'waybackarchiver'
];

/**
 * Verifica se o usuário é um bot baseado no user agent
 * 
 * @param userAgent - String do user agent para verificar
 * @returns true se for um bot conhecido, false caso contrário
 */
export const isBot = (userAgent: string | undefined): boolean => {
    if (!userAgent) return false;

    const lowerUserAgent = userAgent.toLowerCase();

    // Verificar se contém qualquer assinatura de bot conhecida
    return KNOWN_BOTS.some(bot => lowerUserAgent.includes(bot));
};

/**
 * Determina o tipo específico de bot para ajuste de conteúdo
 * 
 * @param userAgent - String do user agent para verificar
 * @returns Categoria do bot ou undefined se não for um bot
 */
export const getBotType = (userAgent: string | undefined): string | undefined => {
    if (!userAgent) return undefined;

    const lowerUserAgent = userAgent.toLowerCase();

    // Verificar tipo específico de bot
    if (lowerUserAgent.includes('googlebot')) return 'google';
    if (lowerUserAgent.includes('bingbot')) return 'bing';
    if (lowerUserAgent.includes('yandexbot')) return 'yandex';
    if (lowerUserAgent.includes('baiduspider')) return 'baidu';
    if (lowerUserAgent.includes('duckduckbot')) return 'duckduckgo';

    // Bots de redes sociais
    if (lowerUserAgent.includes('facebookexternalhit')) return 'facebook';
    if (lowerUserAgent.includes('twitterbot')) return 'twitter';
    if (lowerUserAgent.includes('linkedinbot')) return 'linkedin';
    if (lowerUserAgent.includes('whatsapp')) return 'whatsapp';
    if (lowerUserAgent.includes('telegrambot')) return 'telegram';

    // Ferramentas
    if (lowerUserAgent.includes('lighthouse')) return 'lighthouse';
    if (lowerUserAgent.includes('pagespeed')) return 'pagespeed';
    if (lowerUserAgent.includes('pingdom')) return 'pingdom';
    if (lowerUserAgent.includes('gtmetrix')) return 'gtmetrix';

    // Crawlers de SEO
    if (lowerUserAgent.includes('ahrefsbot')) return 'ahrefs';
    if (lowerUserAgent.includes('semrushbot')) return 'semrush';

    // Prerender
    if (lowerUserAgent.includes('prerender')) return 'prerender';

    // Se não corresponder a nenhum dos tipos específicos, mas corresponder ao padrão geral
    if (isBot(userAgent)) return 'other-bot';

    return undefined;
};

/**
 * Middleware do Express para detecção de bots
 * Adiciona propriedades isBot e botType ao objeto de request
 */
export const botDetectionMiddleware = (req: BotDetectionRequest, res: Response, next: NextFunction): void => {
    const userAgent = req.headers['user-agent'];

    req.isBot = isBot(userAgent as string);
    req.botType = getBotType(userAgent as string);

    if (req.isBot) {
        logger.debug(`Bot detectado: ${req.botType || 'Desconhecido'}`, { userAgent });
    }

    next();
}; 