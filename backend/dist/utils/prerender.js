import dotenv from 'dotenv';
import { logger } from './logger.js';
dotenv.config();
/**
 * Configura o middleware prerender-node para melhorar SEO de aplicações SPA
 * Prerender permite que crawlers de motores de busca vejam o conteúdo renderizado
 * em vez do código JavaScript inicial, melhorando significativamente o SEO
 *
 * @param app Instância do Express
 */
export async function configurePrerender(app) {
    try {
        const prerenderToken = process.env.PRERENDER_TOKEN;
        if (!prerenderToken && process.env.NODE_ENV === 'production') {
            logger.warn('Nenhum token de Prerender.io fornecido. SEO pode ser prejudicado para crawlers.');
        }
        // Apenas carregue o prerender se não estivermos em ambiente de teste
        if (process.env.NODE_ENV !== 'test') {
            // Usando importação dinâmica ao invés de require
            const prerenderModule = await import('prerender-node');
            const prerender = prerenderModule.default;
            // Configuração básica
            const prerenderConfig = prerender
                .set('prerenderToken', prerenderToken)
                .set('protocol', 'https')
                .set('host', process.env.SITE_DOMAIN || 'devferreirag.com')
                .set('forwardHeaders', true);
            // Lista de user agents para prerender (além dos padrões)
            prerenderConfig.set('crawlerUserAgents', [
                'googlebot',
                'bingbot',
                'yandex',
                'baiduspider',
                'facebookexternalhit',
                'twitterbot',
                'rogerbot',
                'linkedinbot',
                'embedly',
                'bufferbot',
                'quora link preview',
                'showyoubot',
                'outbrain',
                'pinterest/0.',
                'developers.google.com/+/web/snippet',
                'www.google.com/webmasters/tools/richsnippets',
                'slackbot',
                'vkShare',
                'W3C_Validator',
                'redditbot',
                'Applebot',
                'WhatsApp',
                'flipboard',
                'tumblr',
                'bitlybot',
                'SkypeUriPreview',
                'nuzzel',
                'Discordbot',
                'Qwantify',
                'Chrome-Lighthouse'
            ]);
            // Adicionar o middleware ao Express
            app.use(prerenderConfig);
            logger.info('👁️ Prerender configurado para melhorar SEO');
        }
    }
    catch (error) {
        logger.error('Falha ao configurar prerender:', error);
    }
}
//# sourceMappingURL=prerender.js.map