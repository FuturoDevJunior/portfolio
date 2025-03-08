import { Router } from 'express';
import { logger, logSeoEvent } from '../utils/logger.js';
const router = Router();
/**
 * @swagger
 * /seo/metadata:
 *   get:
 *     summary: Gera metadados SEO dinâmicos
 *     tags: [SEO]
 *     description: Retorna metadados SEO otimizados baseados na página e idioma
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *         required: true
 *         description: Caminho da página
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *         required: false
 *         description: Código do idioma (pt, en, es)
 *     responses:
 *       200:
 *         description: Metadados SEO
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/metadata', (req, res) => {
    try {
        const { page, lang = 'pt' } = req.query;
        if (!page) {
            return res.status(400).json({ error: 'O parâmetro page é obrigatório' });
        }
        // Registrar evento
        logSeoEvent('metadata_request', page, { lang });
        // Metadados base
        const baseMetadata = {
            title: 'DevFerreiraG - Full Stack Developer',
            description: 'Consultoria especializada em Engenharia de Dados, Desenvolvimento Full-Stack e Arquitetura de Sistemas',
            imageUrl: 'https://devferreirag.com/images/preview.jpg',
            keywords: ['portfolio', 'desenvolvedor', 'full-stack', 'engenharia de dados', 'arquitetura'],
            robots: 'index, follow',
            canonical: `https://devferreirag.com${page}`,
            ogType: 'website',
            twitterCard: 'summary_large_image',
            author: 'DevFerreiraG'
        };
        // Metadados específicos por página
        const specificMetadata = {
            '/': {
                pt: {
                    title: 'DevFerreiraG - Transformação Digital com Engenharia de Ponta',
                    description: 'Consultoria técnica especializada em Engenharia de Dados, Desenvolvimento Full-Stack e Arquitetura de Sistemas',
                    keywords: ['portfolio', 'desenvolvedor full-stack', 'consultoria', 'engenharia de dados']
                },
                en: {
                    title: 'DevFerreiraG - Digital Transformation with Cutting-Edge Engineering',
                    description: 'Specialized technical consulting in Data Engineering, Full-Stack Development, and Systems Architecture',
                    keywords: ['portfolio', 'full-stack developer', 'consulting', 'data engineering']
                },
                es: {
                    title: 'DevFerreiraG - Transformación Digital con Ingeniería de Vanguardia',
                    description: 'Consultoría técnica especializada en Ingeniería de Datos, Desarrollo Full-Stack y Arquitectura de Sistemas',
                    keywords: ['portafolio', 'desarrollador full-stack', 'consultoría', 'ingeniería de datos']
                }
            },
            '/servicos': {
                pt: {
                    title: 'Serviços | DevFerreiraG - Consultoria Especializada',
                    description: 'Conheça os serviços de engenharia de dados, desenvolvimento full-stack e arquitetura de sistemas oferecidos',
                    keywords: ['serviços', 'engenharia de dados', 'desenvolvimento web', 'microsserviços']
                },
                en: {
                    title: 'Services | DevFerreiraG - Specialized Consulting',
                    description: 'Discover the data engineering, full-stack development, and systems architecture services offered',
                    keywords: ['services', 'data engineering', 'web development', 'microservices']
                },
                es: {
                    title: 'Servicios | DevFerreiraG - Consultoría Especializada',
                    description: 'Conozca los servicios de ingeniería de datos, desarrollo full-stack y arquitectura de sistemas ofrecidos',
                    keywords: ['servicios', 'ingeniería de datos', 'desarrollo web', 'microservicios']
                }
            },
            '/cases': {
                pt: {
                    title: 'Cases de Sucesso | DevFerreiraG - Projetos e Resultados',
                    description: 'Conheça os projetos realizados e os resultados obtidos para diferentes clientes e setores',
                    keywords: ['cases', 'projetos', 'resultados', 'cases de sucesso']
                },
                en: {
                    title: 'Success Cases | DevFerreiraG - Projects and Results',
                    description: 'Discover the projects carried out and the results obtained for different clients and sectors',
                    keywords: ['cases', 'projects', 'results', 'success cases']
                },
                es: {
                    title: 'Casos de Éxito | DevFerreiraG - Proyectos y Resultados',
                    description: 'Conozca los proyectos realizados y los resultados obtenidos para diferentes clientes y sectores',
                    keywords: ['casos', 'proyectos', 'resultados', 'casos de éxito']
                }
            },
            '/contato': {
                pt: {
                    title: 'Contato | DevFerreiraG - Vamos Conversar?',
                    description: 'Entre em contato para conversarmos sobre seu projeto e como posso te ajudar',
                    keywords: ['contato', 'orçamento', 'projeto', 'consultoria']
                },
                en: {
                    title: 'Contact | DevFerreiraG - Shall We Talk?',
                    description: 'Get in touch to discuss your project and how I can help you',
                    keywords: ['contact', 'quote', 'project', 'consulting']
                },
                es: {
                    title: 'Contacto | DevFerreiraG - ¿Hablamos?',
                    description: 'Póngase en contacto para hablar sobre su proyecto y cómo puedo ayudarlo',
                    keywords: ['contacto', 'presupuesto', 'proyecto', 'consultoría']
                }
            }
        };
        // Selecionar os metadados específicos com fallback para o idioma padrão
        const pagePath = page;
        const langKey = lang.toLowerCase() || 'pt';
        const pageMetadata = specificMetadata[pagePath]?.[langKey] || specificMetadata[pagePath]?.['pt'] || {};
        // Mesclar metadados base com específicos
        const metadata = {
            ...baseMetadata,
            ...pageMetadata,
            // Garantir URL canônica com o idioma correto
            canonical: langKey !== 'pt'
                ? `https://devferreirag.com/${langKey}${pagePath === '/' ? '' : pagePath}`
                : `https://devferreirag.com${pagePath}`
        };
        res.json(metadata);
    }
    catch (error) {
        logger.error('Erro ao gerar metadados SEO:', error);
        res.status(500).json({ error: 'Falha ao gerar metadados' });
    }
});
/**
 * @swagger
 * /seo/schema-markup:
 *   get:
 *     summary: Gera marcações de schema dinâmicas
 *     tags: [SEO]
 *     description: Retorna marcações JSON-LD para rich snippets baseadas na página
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *         required: true
 *         description: Caminho da página
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         required: false
 *         description: Tipo de schema (person, organization, etc)
 *     responses:
 *       200:
 *         description: Schema markup
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/schema-markup', (req, res) => {
    try {
        const { page, type = 'all' } = req.query;
        if (!page) {
            return res.status(400).json({ error: 'O parâmetro page é obrigatório' });
        }
        // Registrar evento
        logSeoEvent('schema_request', page, { type });
        // Schema padrão da pessoa
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
        // Schema padrão de organização
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
        // Schema padrão do breadcrumb
        const breadcrumbSchema = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
                {
                    '@type': 'ListItem',
                    'position': 1,
                    'name': 'Home',
                    'item': 'https://devferreirag.com'
                }
            ]
        };
        // Adicionar item específico do breadcrumb baseado na página atual
        if (page !== '/') {
            const pageName = page.substring(1);
            const formattedPageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);
            breadcrumbSchema.itemListElement.push({
                '@type': 'ListItem',
                'position': 2,
                'name': formattedPageName,
                'item': `https://devferreirag.com${page}`
            });
        }
        // Retornar o schema específico ou todos
        let response;
        if (type === 'person') {
            response = personSchema;
        }
        else if (type === 'organization') {
            response = organizationSchema;
        }
        else if (type === 'breadcrumb') {
            response = breadcrumbSchema;
        }
        else {
            // Por padrão, retornar todos
            response = [personSchema, organizationSchema, breadcrumbSchema];
        }
        res.json(response);
    }
    catch (error) {
        logger.error('Erro ao gerar schema markup:', error);
        res.status(500).json({ error: 'Falha ao gerar schema markup' });
    }
});
/**
 * @swagger
 * /seo/analytics-code:
 *   get:
 *     summary: Gera snippet de analytics
 *     tags: [SEO]
 *     description: Retorna o código de integração com Google Analytics e Tag Manager
 *     responses:
 *       200:
 *         description: Snippet de código para analytics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/analytics-code', (req, res) => {
    try {
        // Registrar evento
        logSeoEvent('analytics_code_request', '/analytics-code', { userAgent: req.headers['user-agent'] });
        // Gerar código para analytics (GT4)
        const analyticsCode = {
            gtag: {
                id: 'G-CQMQ2ZPWBZ',
                head: `
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-CQMQ2ZPWBZ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-CQMQ2ZPWBZ');
</script>
        `,
                events: {
                    pageView: "gtag('event', 'page_view', { page_location: window.location.href });",
                    contact: "gtag('event', 'contact_form_submit', { form_id: 'contact' });",
                    download: "gtag('event', 'file_download', { file_name: fileName });"
                }
            },
            gtm: {
                id: 'GTM-XXXXXXX',
                head: `
<!-- Google Tag Manager -->
<script>
  (function(w,d,s,l,i){
    w[l]=w[l]||[];
    w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
    var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),
        dl=l!='dataLayer'?'&l='+l:'';
    j.async=true;
    j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
    f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-XXXXXXX');
</script>
<!-- End Google Tag Manager -->
        `,
                body: `
<!-- Google Tag Manager (noscript) -->
<noscript>
  <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX" height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>
<!-- End Google Tag Manager (noscript) -->
        `
            }
        };
        res.json(analyticsCode);
    }
    catch (error) {
        logger.error('Erro ao gerar código de analytics:', error);
        res.status(500).json({ error: 'Falha ao gerar código de analytics' });
    }
});
logger.info('🔍 Rotas de SEO configuradas');
export { router as seoRouter };
//# sourceMappingURL=seo.js.map