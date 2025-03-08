import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from './logger.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Lê a versão do package.json de forma compatível com ESM
const packageJsonPath = path.join(__dirname, '..', '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const version = packageJson.version;
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'DevFerreiraG API Documentation',
            version,
            description: 'API para o portfólio profissional de DevFerreiraG com recursos de SEO, Analytics e Marketing',
            contact: {
                name: 'DevFerreiraG',
                url: 'https://devferreirag.com',
                email: 'contact@devferreirag.com'
            },
            license: {
                name: 'MIT',
                url: 'https://opensource.org/licenses/MIT',
            },
        },
        servers: [
            {
                url: 'http://localhost:3001',
                description: 'Servidor de Desenvolvimento',
            },
            {
                url: 'https://api.devferreirag.com',
                description: 'Servidor de Produção',
            },
        ],
        externalDocs: {
            description: 'Documentação Adicional',
            url: 'https://devferreirag.com/docs',
        },
        tags: [
            {
                name: 'SEO',
                description: 'Operações relacionadas à otimização para motores de busca',
            },
            {
                name: 'Analytics',
                description: 'Operações para coleta e análise de dados de uso',
            },
            {
                name: 'Marketing',
                description: 'Operações para estratégias de marketing digital',
            },
            {
                name: 'Sitemap',
                description: 'Operações para geração de sitemap e structured data',
            },
            {
                name: 'API',
                description: 'Endpoints gerais da API',
            },
        ],
        components: {
            securitySchemes: {
                apiKey: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'X-API-KEY',
                },
            },
        },
    },
    apis: ['./src/routes/*.ts', './src/models/*.ts'],
};
const swaggerSpec = swaggerJSDoc(options);
export const setupSwagger = (app) => {
    // Endpoint para acessar a documentação via interface
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
        explorer: true,
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: 'DevFerreiraG API Documentation',
        customfavIcon: '/favicon.ico',
        swaggerOptions: {
            persistAuthorization: true,
            docExpansion: 'none',
            filter: true,
            tagsSorter: 'alpha',
        },
    }));
    // Endpoint para acessar a especificação em formato JSON
    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    logger.info('🔍 Documentação Swagger configurada');
};
//# sourceMappingURL=swagger.js.map