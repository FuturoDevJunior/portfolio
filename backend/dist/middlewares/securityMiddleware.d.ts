import { Request, Response, NextFunction } from 'express';
/**
 * Interface para configurações de segurança
 */
interface SecurityConfig {
    enableCSP: boolean;
    enableCORS: boolean;
    enableRateLimiting: boolean;
    enableCSRF: boolean;
    trustProxy: boolean;
    httpsOnly: boolean;
}
/**
 * Middleware que aplica cabeçalhos de segurança para proteção contra ataques comuns
 *
 * @param config Configurações de segurança
 */
export declare const securityHeaders: (config?: Partial<SecurityConfig>) => (req: Request, res: Response, next: NextFunction) => void;
/**
 * Middleware que impede acesso a URLs não encriptadas
 * Redireciona HTTP para HTTPS
 */
export declare const httpsRedirect: (req: Request, res: Response, next: NextFunction) => void;
/**
 * Middleware que detecta e bloqueia solicitações suspeitas
 * Baseado em heurísticas simples para detectar ataques
 */
export declare const requestSanitizer: (req: Request, res: Response, next: NextFunction) => void;
export {};
