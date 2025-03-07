import { Router, Request, Response } from 'express';
import { logger } from '../utils/logger.js';

const router = Router();

// Dados do portfolio (em produção, seriam recuperados de um banco de dados)
const portfolioData = {
    services: [
        {
            id: 'data-engineering',
            title: {
                pt: 'Engenharia de Dados',
                en: 'Data Engineering',
                es: 'Ingeniería de Datos'
            },
            description: {
                pt: 'Arquitetura e implementação de pipelines de dados escaláveis, ETL/ELT, e data lakes com as melhores práticas do mercado.',
                en: 'Architecture and implementation of scalable data pipelines, ETL/ELT, and data lakes using market best practices.',
                es: 'Arquitectura e implementación de pipelines de datos escalables, ETL/ELT y data lakes utilizando las mejores prácticas del mercado.'
            },
            skills: ['Apache Spark', 'Airflow', 'Kafka', 'Amazon S3', 'Snowflake', 'dbt', 'Python']
        },
        {
            id: 'fullstack',
            title: {
                pt: 'Desenvolvimento Full-Stack',
                en: 'Full-Stack Development',
                es: 'Desarrollo Full-Stack'
            },
            description: {
                pt: 'Aplicações web modernas e APIs robustas utilizando as tecnologias mais atuais do mercado.',
                en: 'Modern web applications and robust APIs using the latest market technologies.',
                es: 'Aplicaciones web modernas y APIs robustas utilizando las últimas tecnologías del mercado.'
            },
            skills: ['React', 'Next.js', 'Node.js', 'TypeScript', 'GraphQL', 'PostgreSQL', 'MongoDB']
        },
        {
            id: 'architecture',
            title: {
                pt: 'Arquitetura de Sistemas',
                en: 'Systems Architecture',
                es: 'Arquitectura de Sistemas'
            },
            description: {
                pt: 'Design e implementação de arquiteturas escaláveis, microsserviços e sistemas distribuídos.',
                en: 'Design and implementation of scalable architectures, microservices, and distributed systems.',
                es: 'Diseño e implementación de arquitecturas escalables, microservicios y sistemas distribuidos.'
            },
            skills: ['Docker', 'Kubernetes', 'AWS', 'Azure', 'CI/CD', 'Terraform', 'Microservices']
        }
    ],
    expertise: [
        {
            id: 'ai',
            title: {
                pt: 'Inteligência Artificial',
                en: 'Artificial Intelligence',
                es: 'Inteligencia Artificial'
            },
            description: {
                pt: 'Desenvolvimento e implementação de soluções de IA e ML para otimização de processos e tomada de decisão.',
                en: 'Development and implementation of AI and ML solutions for process optimization and decision making.',
                es: 'Desarrollo e implementación de soluciones de IA y ML para optimización de procesos y toma de decisiones.'
            },
            technologies: ['TensorFlow', 'PyTorch', 'scikit-learn', 'Hugging Face', 'LangChain']
        },
        {
            id: 'cloud',
            title: {
                pt: 'Cloud Computing',
                en: 'Cloud Computing',
                es: 'Cloud Computing'
            },
            description: {
                pt: 'Arquitetura e gerenciamento de infraestrutura em nuvem com foco em escalabilidade e segurança.',
                en: 'Cloud infrastructure architecture and management focused on scalability and security.',
                es: 'Arquitectura y gestión de infraestructura en la nube enfocada en escalabilidad y seguridad.'
            },
            technologies: ['AWS Lambda', 'ECS', 'EKS', 'S3', 'DynamoDB', 'Azure Functions', 'GCP']
        },
        {
            id: 'devops',
            title: {
                pt: 'DevOps & SRE',
                en: 'DevOps & SRE',
                es: 'DevOps & SRE'
            },
            description: {
                pt: 'Implementação de práticas DevOps e SRE para automação e confiabilidade de sistemas.',
                en: 'Implementation of DevOps and SRE practices for system automation and reliability.',
                es: 'Implementación de prácticas DevOps y SRE para automatización y confiabilidad de sistemas.'
            },
            technologies: ['Jenkins', 'GitHub Actions', 'Terraform', 'Ansible', 'Prometheus', 'Grafana', 'ELK Stack']
        }
    ],
    caseStudies: [
        {
            id: 'data-warehouse',
            title: {
                pt: 'Data Warehouse Enterprise',
                en: 'Enterprise Data Warehouse',
                es: 'Data Warehouse Empresarial'
            },
            description: {
                pt: 'Implementação de data warehouse moderno para empresa do setor financeiro.',
                en: 'Implementation of modern data warehouse for financial sector company.',
                es: 'Implementación de data warehouse moderno para empresa del sector financiero.'
            },
            results: {
                pt: 'Redução de 60% no tempo de processamento e economia de 40% em custos de infraestrutura.',
                en: '60% reduction in processing time and 40% savings in infrastructure costs.',
                es: '60% de reducción en el tiempo de procesamiento y 40% de ahorro en costos de infraestructura.'
            },
            technologies: ['Snowflake', 'Airflow', 'dbt', 'Fivetran', 'Looker'],
            metrics: [
                {
                    label: { pt: 'Dados Processados', en: 'Data Processed', es: 'Datos Procesados' },
                    value: '2.5 TB/dia'
                },
                {
                    label: { pt: 'Melhoria Performance', en: 'Performance Improvement', es: 'Mejora de Rendimiento' },
                    value: '60%'
                }
            ]
        },
        {
            id: 'ecommerce',
            title: {
                pt: 'Plataforma E-commerce',
                en: 'E-commerce Platform',
                es: 'Plataforma de E-commerce'
            },
            description: {
                pt: 'Desenvolvimento de plataforma e-commerce escalável com microsserviços.',
                en: 'Development of scalable e-commerce platform with microservices.',
                es: 'Desarrollo de plataforma de e-commerce escalable con microservicios.'
            },
            results: {
                pt: 'Aumento de 45% na taxa de conversão e redução de 30% no tempo de carregamento.',
                en: '45% increase in conversion rate and 30% reduction in loading time.',
                es: '45% de aumento en la tasa de conversión y 30% de reducción en el tiempo de carga.'
            },
            technologies: ['React', 'Node.js', 'GraphQL', 'MongoDB', 'Redis', 'AWS'],
            metrics: [
                {
                    label: { pt: 'Taxa Conversão', en: 'Conversion Rate', es: 'Tasa de Conversión' },
                    value: '45%'
                },
                {
                    label: { pt: 'Tempo Carregamento', en: 'Loading Time', es: 'Tiempo de Carga' },
                    value: '0.8s'
                }
            ]
        }
    ]
};

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Obtém serviços oferecidos
 *     tags: [API]
 *     description: Retorna a lista de serviços oferecidos
 *     parameters:
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *         required: false
 *         description: Código do idioma (pt, en, es)
 *     responses:
 *       200:
 *         description: Lista de serviços
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get('/services', (req: Request, res: Response) => {
    try {
        const lang = ((req.query.lang || 'pt') as string).toLowerCase();

        // Formatar a resposta no idioma solicitado
        const services = portfolioData.services.map(service => ({
            id: service.id,
            title: service.title[lang as keyof typeof service.title] || service.title.pt,
            description: service.description[lang as keyof typeof service.description] || service.description.pt,
            skills: service.skills
        }));

        res.json(services);
    } catch (error) {
        logger.error('Erro ao obter serviços:', error);
        res.status(500).json({ error: 'Falha ao recuperar serviços' });
    }
});

/**
 * @swagger
 * /api/expertise:
 *   get:
 *     summary: Obtém áreas de expertise
 *     tags: [API]
 *     description: Retorna a lista de áreas de expertise
 *     parameters:
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *         required: false
 *         description: Código do idioma (pt, en, es)
 *     responses:
 *       200:
 *         description: Lista de áreas de expertise
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get('/expertise', (req: Request, res: Response) => {
    try {
        const lang = ((req.query.lang || 'pt') as string).toLowerCase();

        // Formatar a resposta no idioma solicitado
        const expertise = portfolioData.expertise.map(exp => ({
            id: exp.id,
            title: exp.title[lang as keyof typeof exp.title] || exp.title.pt,
            description: exp.description[lang as keyof typeof exp.description] || exp.description.pt,
            technologies: exp.technologies
        }));

        res.json(expertise);
    } catch (error) {
        logger.error('Erro ao obter expertise:', error);
        res.status(500).json({ error: 'Falha ao recuperar áreas de expertise' });
    }
});

/**
 * @swagger
 * /api/case-studies:
 *   get:
 *     summary: Obtém cases de sucesso
 *     tags: [API]
 *     description: Retorna a lista de cases de sucesso
 *     parameters:
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *         required: false
 *         description: Código do idioma (pt, en, es)
 *     responses:
 *       200:
 *         description: Lista de cases de sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get('/case-studies', (req: Request, res: Response) => {
    try {
        const lang = ((req.query.lang || 'pt') as string).toLowerCase();

        // Formatar a resposta no idioma solicitado
        const caseStudies = portfolioData.caseStudies.map(cs => ({
            id: cs.id,
            title: cs.title[lang as keyof typeof cs.title] || cs.title.pt,
            description: cs.description[lang as keyof typeof cs.description] || cs.description.pt,
            results: cs.results[lang as keyof typeof cs.results] || cs.results.pt,
            technologies: cs.technologies,
            metrics: cs.metrics.map(metric => ({
                label: metric.label[lang as keyof typeof metric.label] || metric.label.pt,
                value: metric.value
            }))
        }));

        res.json(caseStudies);
    } catch (error) {
        logger.error('Erro ao obter cases de sucesso:', error);
        res.status(500).json({ error: 'Falha ao recuperar cases de sucesso' });
    }
});

/**
 * @swagger
 * /api/case-studies/{id}:
 *   get:
 *     summary: Obtém um case de sucesso específico
 *     tags: [API]
 *     description: Retorna detalhes de um case de sucesso específico
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do case de sucesso
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *         required: false
 *         description: Código do idioma (pt, en, es)
 *     responses:
 *       200:
 *         description: Detalhes do case
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Case não encontrado
 */
router.get('/case-studies/:id', (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const lang = ((req.query.lang || 'pt') as string).toLowerCase();

        // Buscar o case específico
        const caseStudy = portfolioData.caseStudies.find(cs => cs.id === id);

        if (!caseStudy) {
            return res.status(404).json({ error: 'Case não encontrado' });
        }

        // Formatar a resposta no idioma solicitado
        const formattedCaseStudy = {
            id: caseStudy.id,
            title: caseStudy.title[lang as keyof typeof caseStudy.title] || caseStudy.title.pt,
            description: caseStudy.description[lang as keyof typeof caseStudy.description] || caseStudy.description.pt,
            results: caseStudy.results[lang as keyof typeof caseStudy.results] || caseStudy.results.pt,
            technologies: caseStudy.technologies,
            metrics: caseStudy.metrics.map(metric => ({
                label: metric.label[lang as keyof typeof metric.label] || metric.label.pt,
                value: metric.value
            }))
        };

        res.json(formattedCaseStudy);
    } catch (error) {
        logger.error('Erro ao obter case específico:', error);
        res.status(500).json({ error: 'Falha ao recuperar case' });
    }
});

logger.info('🚀 Rotas da API configuradas');

export { router as apiRouter }; 