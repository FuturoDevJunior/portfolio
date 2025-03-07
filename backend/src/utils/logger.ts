import pino from 'pino';
import dotenv from 'dotenv';

dotenv.config();

// Configuração do logger
const transport = {
    target: 'pino-pretty',
    options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname'
    }
};

// Definir nível de log com base no ambiente
const logLevel = process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug');

// Desativar logs de depuração em produção
const productionLogOptions = {
    level: logLevel,
    // Em produção, não usar formatação pino-pretty para otimizar performance
    redact: ['req.headers.authorization', 'req.headers.cookie', 'res.headers["set-cookie"]'],
    formatters: {
        level: (label: string) => {
            return { level: label };
        }
    }
};

// Configurações de log para desenvolvimento
const developmentLogOptions = {
    level: logLevel,
    transport: process.env.NODE_ENV !== 'production' ? transport : undefined,
    redact: ['req.headers.authorization', 'req.headers.cookie', 'res.headers["set-cookie"]']
};

// Escolher configurações baseadas no ambiente
export const logger = pino.default(
    process.env.NODE_ENV === 'production' ? productionLogOptions : developmentLogOptions
);

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