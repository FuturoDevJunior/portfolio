import { Router } from 'express';
import NodeCache from 'node-cache';
import { logger, logMarketingEvent } from '../utils/logger.js';
const router = Router();
// Cache para armazenar dados de campanhas
const campaignCache = new NodeCache({ stdTTL: 86400, checkperiod: 600 });
// Estatísticas de campanhas em memória
const utmSources = {};
const utmMediums = {};
const utmCampaigns = {};
const conversions = {};
const leads = [];
/**
 * @swagger
 * /marketing/track:
 *   post:
 *     summary: Rastreia origem de marketing
 *     tags: [Marketing]
 *     description: Registra dados de campanhas de marketing (UTM parameters)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionId:
 *                 type: string
 *                 description: ID de sessão do visitante
 *               source:
 *                 type: string
 *                 description: utm_source
 *               medium:
 *                 type: string
 *                 description: utm_medium
 *               campaign:
 *                 type: string
 *                 description: utm_campaign
 *               content:
 *                 type: string
 *                 description: utm_content
 *               term:
 *                 type: string
 *                 description: utm_term
 *     responses:
 *       200:
 *         description: Parâmetros de marketing registrados com sucesso
 */
router.post('/track', (req, res) => {
    try {
        const { sessionId, source, medium, campaign, content, term } = req.body;
        // Registrar os parâmetros de UTM para esta sessão
        if (sessionId) {
            const utmParams = { source, medium, campaign, content, term };
            campaignCache.set(`utm_${sessionId}`, utmParams);
            // Incrementar contadores de origem
            if (source) {
                utmSources[source] = (utmSources[source] || 0) + 1;
            }
            if (medium) {
                utmMediums[medium] = (utmMediums[medium] || 0) + 1;
            }
            if (campaign) {
                utmCampaigns[campaign] = (utmCampaigns[campaign] || 0) + 1;
            }
            // Registrar evento
            logMarketingEvent('utm_tracking', source || 'direct', {
                sessionId,
                ...utmParams
            });
        }
        res.status(200).json({
            success: true,
            message: 'Parâmetros de marketing registrados'
        });
    }
    catch (error) {
        logger.error('Erro ao registrar parâmetros de marketing:', error);
        res.status(500).json({ error: 'Falha ao registrar parâmetros' });
    }
});
/**
 * @swagger
 * /marketing/conversion:
 *   post:
 *     summary: Registra uma conversão
 *     tags: [Marketing]
 *     description: Registra uma conversão de marketing (ex. formulário enviado, download)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionId:
 *                 type: string
 *                 description: ID de sessão do visitante
 *               type:
 *                 type: string
 *                 description: Tipo de conversão
 *               value:
 *                 type: number
 *                 description: Valor da conversão, se aplicável
 *     responses:
 *       200:
 *         description: Conversão registrada com sucesso
 */
router.post('/conversion', (req, res) => {
    try {
        const { sessionId, type, value } = req.body;
        if (!sessionId || !type) {
            return res.status(400).json({ error: 'SessionId e type são obrigatórios' });
        }
        // Registrar a conversão
        conversions[type] = (conversions[type] || 0) + 1;
        // Associar a conversão com os parâmetros de UTM, se disponíveis
        const utmParams = campaignCache.get(`utm_${sessionId}`);
        // Registrar evento
        logMarketingEvent('conversion', type, {
            sessionId,
            value,
            ...(utmParams || {})
        });
        res.status(200).json({
            success: true,
            message: 'Conversão registrada com sucesso'
        });
    }
    catch (error) {
        logger.error('Erro ao registrar conversão:', error);
        res.status(500).json({ error: 'Falha ao registrar conversão' });
    }
});
/**
 * @swagger
 * /marketing/lead:
 *   post:
 *     summary: Registra um lead
 *     tags: [Marketing]
 *     description: Registra um lead de marketing (ex. formulário de contato)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionId:
 *                 type: string
 *                 description: ID de sessão do visitante
 *               email:
 *                 type: string
 *                 description: Email do lead
 *               name:
 *                 type: string
 *                 description: Nome do lead
 *               source:
 *                 type: string
 *                 description: Fonte do lead
 *     responses:
 *       200:
 *         description: Lead registrado com sucesso
 */
router.post('/lead', (req, res) => {
    try {
        const { sessionId, email, name, source } = req.body;
        if (!email) {
            return res.status(400).json({ error: 'Email é obrigatório' });
        }
        // Verificar se este email já foi registrado
        if (!leads.includes(email)) {
            leads.push(email);
            // Registrar evento
            logMarketingEvent('lead_capture', source || 'website', {
                sessionId,
                email: `${email.substring(0, 3)}***@${email.split('@')[1]}`, // Mascara parcial do email por privacidade
                hasName: !!name
            });
        }
        res.status(200).json({
            success: true,
            message: 'Lead registrado com sucesso'
        });
    }
    catch (error) {
        logger.error('Erro ao registrar lead:', error);
        res.status(500).json({ error: 'Falha ao registrar lead' });
    }
});
/**
 * @swagger
 * /marketing/stats:
 *   get:
 *     summary: Obtém estatísticas de marketing
 *     tags: [Marketing]
 *     description: Retorna estatísticas agregadas de campanhas de marketing
 *     security:
 *       - apiKey: []
 *     responses:
 *       200:
 *         description: Estatísticas de marketing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       401:
 *         description: Não autorizado
 */
router.get('/stats', (req, res) => {
    try {
        // Verificar API key para proteção
        const apiKey = req.headers['x-api-key'];
        if (apiKey !== process.env.ADMIN_API_KEY) {
            return res.status(401).json({ error: 'Não autorizado' });
        }
        // Preparar estatísticas
        const stats = {
            sources: utmSources,
            mediums: utmMediums,
            campaigns: utmCampaigns,
            conversions,
            totalLeads: leads.length,
            conversionRates: {
                // Exemplo de taxa de conversão: leads / visitas únicas
                // Você precisaria de dados reais para calcular isto corretamente
                leadRate: 0.05 // 5% de taxa de conversão como exemplo
            },
            timestamp: new Date().toISOString()
        };
        res.json(stats);
    }
    catch (error) {
        logger.error('Erro ao obter estatísticas de marketing:', error);
        res.status(500).json({ error: 'Falha ao obter estatísticas' });
    }
});
logger.info('🎯 Rotas de marketing configuradas');
export { router as marketingRouter };
//# sourceMappingURL=marketing.js.map