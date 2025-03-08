/**
 * Utilitário para detecção de bots e crawlers
 * Permite adaptar a resposta do servidor com base na origem da solicitação
 */
import { Request, Response, NextFunction } from 'express';
export interface BotDetectionRequest extends Request {
    isBot?: boolean;
    botType?: string;
}
/**
 * Verifica se o usuário é um bot baseado no user agent
 *
 * @param userAgent - String do user agent para verificar
 * @returns true se for um bot conhecido, false caso contrário
 */
export declare const isBot: (userAgent: string | undefined) => boolean;
/**
 * Determina o tipo específico de bot para ajuste de conteúdo
 *
 * @param userAgent - String do user agent para verificar
 * @returns Categoria do bot ou undefined se não for um bot
 */
export declare const getBotType: (userAgent: string | undefined) => string | undefined;
/**
 * Middleware do Express para detecção de bots
 * Adiciona propriedades isBot e botType ao objeto de request
 */
export declare const botDetectionMiddleware: (req: BotDetectionRequest, res: Response, next: NextFunction) => void;
