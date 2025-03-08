import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.js';

/**
 * Middleware para redirecionar entre domínios, garantindo consistência SEO
 * e evitando conteúdo duplicado entre .com e .com.br
 * 
 * Por padrão, redirecionará para o domínio primário configurado (www.devferreirag.com)
 * 
 * @param options Opções de configuração do redirecionamento
 */
export const domainRedirectMiddleware = (options: {
    enabled: boolean;
    primaryDomain?: string;
    excludePaths?: string[];
}) => {
    const {
        enabled = true,
        primaryDomain = 'www.devferreirag.com',
        excludePaths = ['/api', '/health', '/api-docs']
    } = options;

    return (req: Request, res: Response, next: NextFunction): void => {
        if (!enabled) {
            return next();
        }

        const host = req.headers.host || '';

        // Ignorar se estiver em ambiente de desenvolvimento ou em caminhos excluídos
        if (process.env.NODE_ENV === 'development' || !host) {
            return next();
        }

        // Verificar se o caminho da URL deve ser excluído do redirecionamento
        for (const path of excludePaths) {
            if (req.path.startsWith(path)) {
                return next();
            }
        }

        // Remover porta do host, se presente
        const hostWithoutPort = host.split(':')[0];

        // Verificar se precisa redirecionar
        if (hostWithoutPort !== primaryDomain) {
            const protocol = req.secure || (req.headers['x-forwarded-proto'] === 'https') ? 'https' : 'http';
            const redirectUrl = `${protocol}://${primaryDomain}${req.originalUrl}`;

            logger.info(`Redirecionando ${host}${req.originalUrl} para ${redirectUrl}`);

            // Retornar redirecionamento permanente (301)
            return res.redirect(301, redirectUrl);
        }

        next();
    };
};

export default domainRedirectMiddleware; 