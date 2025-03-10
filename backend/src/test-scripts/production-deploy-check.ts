/**
 * Script para verificar a implantação em produção
 * 
 * Para executar:
 * 1. Ajuste a URL base para o ambiente de produção
 * 2. Execute: NODE_ENV=production npx ts-node src/test-scripts/production-deploy-check.ts
 */

interface ApiResponse {
    ok: boolean;
    status: number;
    text(): Promise<string>;
    json(): Promise<Record<string, unknown>>;
}

interface HealthCheckResponse {
    status: string;
    timestamp: string;
    service: string;
    version: string;
    environment: string;
    uptime: number;
    isBot: boolean;
    botType?: string;
}

const checkProduction = async (): Promise<void> => {
    try {
        // URL base de produção
        const baseUrl = process.env.PROD_API_URL || 'https://api.devferreirag.com';

        console.log(`🏭 Iniciando verificação do ambiente de produção: ${baseUrl}`);

        // Verificar rota de saúde
        console.log('💓 Verificando health check...');
        const healthResponse: ApiResponse = await fetch(`${baseUrl}/health`);

        if (healthResponse.ok) {
            // Conversão segura usando tipo unknown intermediário
            const responseData = await healthResponse.json() as unknown;
            const healthData = responseData as HealthCheckResponse;
            console.log('✅ Health check retornou: ', healthData);
        } else {
            console.error('❌ Health check falhou:', await healthResponse.text());
            process.exit(1);
        }

        // Verificar se os arquivos estáticos estão acessíveis
        console.log('📁 Verificando arquivo de analytics...');
        const scriptResponse: ApiResponse = await fetch(`${baseUrl}/js/analytics.js`);

        if (scriptResponse.ok) {
            console.log('✅ Script de analytics está acessível!');
        } else {
            console.error('❌ Script de analytics não está acessível:', await scriptResponse.text());
        }

        // Verificar se o sitemap está acessível
        console.log('🗺️ Verificando sitemap...');
        const sitemapResponse: ApiResponse = await fetch(`${baseUrl}/sitemap.xml`);

        if (sitemapResponse.ok) {
            console.log('✅ Sitemap está acessível!');
        } else {
            console.error('❌ Sitemap não está acessível:', await sitemapResponse.text());
        }

        // Verificar robots.txt
        console.log('🤖 Verificando robots.txt...');
        const robotsResponse: ApiResponse = await fetch(`${baseUrl}/robots.txt`);

        if (robotsResponse.ok) {
            console.log('✅ Robots.txt está acessível!');
        } else {
            console.error('❌ Robots.txt não está acessível:', await robotsResponse.text());
        }

        // Verificar rotas de API sem enviar dados (apenas para confirmar que estão respondendo)
        console.log('🔄 Verificando se rotas de API estão respondendo (OPTIONS)...');

        const routesToCheck: string[] = [
            '/analytics/pageview',
            '/analytics/event',
            '/analytics/batch',
            '/marketing/track',
            '/marketing/conversion',
            '/marketing/lead'
        ];

        for (const route of routesToCheck) {
            try {
                const response: ApiResponse = await fetch(`${baseUrl}${route}`, { method: 'OPTIONS' });
                if (response.ok || response.status === 204) {
                    console.log(`✅ Rota ${route} está respondendo`);
                } else {
                    console.error(`❌ Rota ${route} não está respondendo corretamente:`, response.status);
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error(`❌ Erro ao verificar rota ${route}:`, error.message);
                } else {
                    console.error(`❌ Erro ao verificar rota ${route}:`, String(error));
                }
            }
        }

        console.log('🎉 Verificação de produção concluída!');

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('❌ Erro ao verificar produção:', error.message);
        } else {
            console.error('❌ Erro ao verificar produção:', String(error));
        }
        process.exit(1);
    }
};

// Executa a verificação
checkProduction(); 