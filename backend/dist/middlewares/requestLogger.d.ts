import { Request, Response, NextFunction } from 'express';
/**
 * Middleware para registro detalhado de requisições da API
 * Adiciona um ID de rastreamento único a cada requisição
 * e registra dados para analytics
 */
export declare const requestLogger: (req: Request, res: Response, next: NextFunction) => void;
