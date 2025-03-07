import pino from 'pino';
import dotenv from 'dotenv';

dotenv.config();

// Configuração do logger
const transport = pino.transport({
    target: 'pino-pretty',
    options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
    },
});

// Configurar nível de log baseado no ambiente
const logLevel = process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug');

export const logger = pino.default({
    level: logLevel,
    transport: process.env.NODE_ENV !== 'production' ? transport : undefined,
    base: undefined,
}, transport);

// Função para registrar erros com contexto adicional
export const logError = (err: Error, context?: Record<string, unknown>): void => {
    logger.error({
        err,
        ...context,
    }, err.message);
};

// Função para registrar requisições de API
export const logApiRequest = (
    method: string,
    path: string,
    statusCode: number,
    responseTime: number,
    userAgent?: string,
    userId?: string
): void => {
    logger.info({
        type: 'request',
        method,
        path,
        statusCode,
        responseTime,
        userAgent,
        userId,
    });
};

// Função para registrar eventos de marketing
export const logMarketingEvent = (
    eventType: string,
    source: string,
    data: Record<string, unknown>
): void => {
    logger.info({
        type: 'marketing',
        eventType,
        source,
        ...data,
    });
};

// Função para registrar eventos de SEO
export const logSeoEvent = (
    eventType: string,
    path: string,
    data: Record<string, unknown>
): void => {
    logger.info({
        type: 'seo',
        eventType,
        path,
        ...data,
    });
}; 