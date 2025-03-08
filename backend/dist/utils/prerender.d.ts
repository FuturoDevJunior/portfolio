import { Express } from 'express';
/**
 * Configura o middleware prerender-node para melhorar SEO de aplicações SPA
 * Prerender permite que crawlers de motores de busca vejam o conteúdo renderizado
 * em vez do código JavaScript inicial, melhorando significativamente o SEO
 *
 * @param app Instância do Express
 */
export declare function configurePrerender(app: Express): Promise<void>;
