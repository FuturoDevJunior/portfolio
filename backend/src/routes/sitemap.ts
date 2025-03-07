import { Router, Request, Response } from 'express';
import { sitemapXML, sitemapTxt } from 'express-sitemap-xml';
import { logger, logSeoEvent } from '../utils/logger.js';

const router = Router();

// Páginas do site
const pages = [
    { url: '/', changefreq: 'weekly', priority: 1.0, lastmod: new Date() },
    { url: '/servicos', changefreq: 'monthly', priority: 0.8, lastmod: new Date() },
    { url: '/expertises', changefreq: 'monthly', priority: 0.8, lastmod: new Date() },
    { url: '/cases', changefreq: 'monthly', priority: 0.9, lastmod: new Date() },
    { url: '/contato', changefreq: 'yearly', priority: 0.7, lastmod: new Date() },
];

// Adicione suporte para idiomas alternativos
const localizedPages = [
    ...pages.map(page => ({ ...page, url: `/en${page.url}` })),
    ...pages.map(page => ({ ...page, url: `/es${page.url}` })),
];

const allPages = [...pages, ...localizedPages];

/**
 * @swagger
 * /sitemap.xml:
 *   get:
 *     summary: Gera um sitemap XML para motores de busca
 *     tags: [Sitemap]
 *     description: Retorna um sitemap XML com todas as páginas do site para melhorar a indexação nos motores de busca
 *     responses:
 *       200:
 *         description: Sitemap XML
 *         content:
 *           application/xml:
 *             schema:
 *               type: string
 */
router.get('/sitemap.xml', sitemapXML(async () => {
    logSeoEvent('sitemap_request', '/sitemap.xml', { format: 'xml' });
    return allPages;
}));

/**
 * @swagger
 * /sitemap.txt:
 *   get:
 *     summary: Gera um sitemap em formato texto
 *     tags: [Sitemap]
 *     description: Retorna uma lista de URLs do site em formato texto simples
 *     responses:
 *       200:
 *         description: Sitemap em formato texto
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
router.get('/sitemap.txt', sitemapTxt(async () => {
    logSeoEvent('sitemap_request', '/sitemap.txt', { format: 'txt' });
    return allPages.map(page => page.url);
}));

/**
 * @swagger
 * /structured-data:
 *   get:
 *     summary: Fornece dados estruturados para rich snippets
 *     tags: [SEO]
 *     description: Retorna JSON-LD para rich snippets no Google e outros motores de busca
 *     responses:
 *       200:
 *         description: Dados estruturados em formato JSON-LD
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/structured-data', (req: Request, res: Response) => {
    // Structured data para persona
    const personSchema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        'name': 'DevFerreiraG',
        'url': 'https://devferreirag.com',
        'jobTitle': 'Desenvolvedor Full Stack',
        'sameAs': [
            'https://linkedin.com/in/DevFerreiraG',
            'https://github.com/FuturoDevJunior'
        ],
        'knowsAbout': [
            'Engenharia de Dados',
            'Desenvolvimento Full-Stack',
            'Arquitetura de Sistemas'
        ]
    };

    // Structured data para organização/empresa
    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        'name': 'DevFerreiraG - Consultoria de Software',
        'url': 'https://devferreirag.com',
        'logo': 'https://devferreirag.com/logo.png',
        'description': 'Consultoria técnica especializada em Engenharia de Dados, Desenvolvimento Full-Stack e Arquitetura de Sistemas',
        'address': {
            '@type': 'PostalAddress',
            'addressCountry': 'BR',
            'addressLocality': 'São Paulo',
            'addressRegion': 'SP'
        },
        'geo': {
            '@type': 'GeoCoordinates',
            'latitude': -23.5505,
            'longitude': -46.6333
        },
        'telephone': '+551191234-5678',
        'email': 'contact@devferreirag.com',
        'priceRange': '$$$',
        'openingHours': 'Mo,Tu,We,Th,Fr 09:00-18:00'
    };

    const structuredData = {
        person: personSchema,
        organization: organizationSchema
    };

    logSeoEvent('structured_data_request', '/structured-data', { userAgent: req.headers['user-agent'] });
    res.json(structuredData);
});

/**
 * @swagger
 * /robots.txt:
 *   get:
 *     summary: Fornece o arquivo robots.txt
 *     tags: [SEO]
 *     description: Retorna o arquivo robots.txt para orientar crawlers de motores de busca
 *     responses:
 *       200:
 *         description: Arquivo robots.txt
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
router.get('/robots.txt', (req: Request, res: Response) => {
    const isProd = process.env.NODE_ENV === 'production';
    const baseUrl = isProd ? 'https://devferreirag.com' : 'http://localhost:3001';

    const robotsTxt = [
        'User-agent: *',
        'Allow: /',
        'Disallow: /admin/',
        `Sitemap: ${baseUrl}/sitemap.xml`,
        `Host: ${baseUrl}`,
    ].join('\n');

    logSeoEvent('robots_txt_request', '/robots.txt', { userAgent: req.headers['user-agent'] });
    res.set('Content-Type', 'text/plain').send(robotsTxt);
});

logger.info('🗺️ Rotas de sitemap configuradas');

export { router as sitemapRouter }; 