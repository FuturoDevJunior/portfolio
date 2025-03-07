import { Router, Request, Response } from 'express';
import NodeCache from 'node-cache';
import { v4 as uuidv4 } from 'uuid';
import { logger, logMarketingEvent } from '../utils/logger.js';

const router = Router();

// Cache para armazenar as métricas de analytics em memória
const metricsCache = new NodeCache({ stdTTL: 3600, checkperiod: 120 });

// Estatísticas anônimas em memória
const pageViews: Record<string, number> = {};
const uniqueVisitors: Set<string> = new Set();
const referrers: Record<string, number> = {};
const deviceTypes: Record<string, number> = {};

interface CountryCount {
    [key: string]: number;
}

const countries: CountryCount = {};
const languages: Record<string, number> = {};

/**
 * @swagger
 * /analytics/pageview:
 *   post:
 *     summary: Registra visualização de página
 *     tags: [Analytics]
 *     description: Endpoint para registrar visualizações de página
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               page:
 *                 type: string
 *                 description: Caminho da página visualizada
 *               sessionId:
 *                 type: string
 *                 description: ID da sessão do visitante
 *               referrer:
 *                 type: string
 *                 description: URL de origem da visita
 *               language:
 *                 type: string
 *                 description: Idioma do navegador
 *     responses:
 *       200:
 *         description: Visualização registrada com sucesso
 */
router.post('/pageview', (req: Request, res: Response) => {
    try {
        const { page, sessionId, referrer, language } = req.body;
        const userAgent = req.headers['user-agent'] || 'unknown';
        const country = req.headers['cf-ipcountry'] || (req.ip ? req.ip.split(':').pop() : 'unknown') || 'unknown';

        // Gera um ID de sessão se não tiver um
        const visitorId = sessionId || uuidv4();

        // Incrementa contadores
        pageViews[page] = (pageViews[page] || 0) + 1;
        uniqueVisitors.add(visitorId);

        if (referrer) {
            referrers[referrer] = (referrers[referrer] || 0) + 1;
        }

        // Detecta tipo de dispositivo simplificado
        const isMobile = /mobile|android|iphone|ipad|ipod/i.test(userAgent);
        const deviceType = isMobile ? 'mobile' : 'desktop';
        deviceTypes[deviceType] = (deviceTypes[deviceType] || 0) + 1;

        // Registra o país 
        const countryStr = typeof country === 'string' ? country : String(country);
        countries[countryStr] = (countries[countryStr] || 0) + 1;

        // Registra idioma
        if (language) {
            languages[language] = (languages[language] || 0) + 1;
        }

        // Registra evento em log 
        logMarketingEvent('pageview', page, {
            visitorId,
            referrer,
            deviceType,
            country,
            language
        });

        res.status(200).json({
            success: true,
            visitorId
        });
    } catch (error) {
        console.error('Erro ao registrar pageview:', error);
        res.status(500).json({ error: 'Falha ao registrar pageview' });
    }
});

/**
 * @swagger
 * /analytics/event:
 *   post:
 *     summary: Registra evento de usuário
 *     tags: [Analytics]
 *     description: Endpoint para registrar eventos de usuário (cliques, interações)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventType:
 *                 type: string
 *                 description: Tipo de evento (clique, scroll, etc)
 *               elementId:
 *                 type: string
 *                 description: ID do elemento com o qual interagiu
 *               sessionId:
 *                 type: string
 *                 description: ID da sessão do visitante
 *               page:
 *                 type: string
 *                 description: Página onde o evento ocorreu
 *     responses:
 *       200:
 *         description: Evento registrado com sucesso
 */
router.post('/event', (req: Request, res: Response) => {
    try {
        const { eventType, elementId, sessionId, page } = req.body;

        // Registra evento em log
        logMarketingEvent(eventType, page, {
            elementId,
            sessionId
        });

        res.status(200).json({
            success: true,
            event: eventType
        });
    } catch (error) {
        console.error('Erro ao registrar evento:', error);
        res.status(500).json({ error: 'Falha ao registrar evento' });
    }
});

/**
 * @swagger
 * /analytics/metrics:
 *   get:
 *     summary: Obtém métricas de analytics
 *     tags: [Analytics]
 *     description: Retorna métricas agregadas de uso do site
 *     security:
 *       - apiKey: []
 *     responses:
 *       200:
 *         description: Métricas de analytics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       401:
 *         description: Não autorizado
 */
router.get('/metrics', (req: Request, res: Response) => {
    try {
        // Verificar API key para proteção
        const apiKey = req.headers['x-api-key'];
        if (apiKey !== process.env.ADMIN_API_KEY) {
            return res.status(401).json({ error: 'Não autorizado' });
        }

        // Obter as métricas
        const metrics = {
            totalPageViews: Object.values(pageViews).reduce((sum, views) => sum + views, 0),
            uniqueVisitors: uniqueVisitors.size,
            topPages: Object.entries(pageViews)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 10),
            topReferrers: Object.entries(referrers)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 10),
            deviceTypes,
            countries,
            languages,
            timestamp: new Date().toISOString()
        };

        // Atualizar o cache
        metricsCache.set('siteMetrics', metrics);

        res.json(metrics);
    } catch (error) {
        console.error('Erro ao obter métricas:', error);
        res.status(500).json({ error: 'Falha ao obter métricas' });
    }
});

logger.info('📊 Rotas de analytics configuradas');

export { router as analyticsRouter }; 