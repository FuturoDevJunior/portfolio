import { Request, Response, NextFunction } from 'express';
interface ApiError extends Error {
    statusCode?: number;
    code?: string;
    errors?: unknown[];
}
/**
 * Middleware para tratamento centralizado de erros da API
 * Registra erros e envia respostas apropriadas para o cliente
 */
export declare const errorHandler: (err: ApiError, req: Request, res: Response, _next: NextFunction) => void;
export {};
