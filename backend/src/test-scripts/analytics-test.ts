/**
 * Script de teste para as rotas de analytics e marketing
 * 
 * Para executar: 
 * 1. Certifique-se de que o servidor está rodando em desenvolvimento
 * 2. Execute: npx ts-node src/test-scripts/analytics-test.ts
 */

interface ApiResponse {
    ok: boolean;
    text(): Promise<string>;
    json(): Promise<Record<string, unknown>>;
}

const testAnalytics = async (): Promise<void> => {
    try {
        console.log('🧪 Iniciando testes de analytics e marketing...');

        // URL base - Ajuste conforme necessário
        const baseUrl = process.env.API_BASE_URL || 'http://localhost:3001';

        // Headers comuns
        const headers = {
            'Content-Type': 'application/json'
        };

        // Dados de teste
        const sessionId = `test-${Date.now()}`;

        console.log('📊 Testando rota de pageview...');
        const pageviewResponse: ApiResponse = await fetch(`${baseUrl}/analytics/pageview`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                page: '/test-page',
                sessionId,
                referrer: 'https://www.google.com',
                language: 'pt-BR',
                title: 'Página de Teste'
            })
        });

        if (pageviewResponse.ok) {
            console.log('✅ Teste de pageview concluído com sucesso!');
        } else {
            console.error('❌ Falha no teste de pageview:', await pageviewResponse.text());
        }

        console.log('🖱️ Testando rota de evento...');
        const eventResponse: ApiResponse = await fetch(`${baseUrl}/analytics/event`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                eventType: 'click',
                elementId: 'test-button',
                sessionId,
                page: '/test-page'
            })
        });

        if (eventResponse.ok) {
            console.log('✅ Teste de evento concluído com sucesso!');
        } else {
            console.error('❌ Falha no teste de evento:', await eventResponse.text());
        }

        console.log('📦 Testando rota de batch...');
        const batchResponse: ApiResponse = await fetch(`${baseUrl}/analytics/batch`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                events: [
                    {
                        eventType: 'pageview',
                        page: '/test-batch-page',
                        sessionId,
                        referrer: 'https://www.bing.com',
                        language: 'pt-BR'
                    },
                    {
                        eventType: 'click',
                        page: '/test-batch-page',
                        sessionId,
                        elementId: 'batch-button'
                    }
                ],
                timestamp: new Date().toISOString()
            })
        });

        if (batchResponse.ok) {
            console.log('✅ Teste de batch concluído com sucesso!');
        } else {
            console.error('❌ Falha no teste de batch:', await batchResponse.text());
        }

        console.log('🔗 Testando rota de UTM...');
        const utmResponse: ApiResponse = await fetch(`${baseUrl}/marketing/track`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                sessionId,
                source: 'test-source',
                medium: 'test-medium',
                campaign: 'test-campaign'
            })
        });

        if (utmResponse.ok) {
            console.log('✅ Teste de UTM concluído com sucesso!');
        } else {
            console.error('❌ Falha no teste de UTM:', await utmResponse.text());
        }

        console.log('💰 Testando rota de conversão...');
        const conversionResponse: ApiResponse = await fetch(`${baseUrl}/marketing/conversion`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                sessionId,
                type: 'test-conversion',
                value: 99.90
            })
        });

        if (conversionResponse.ok) {
            console.log('✅ Teste de conversão concluído com sucesso!');
        } else {
            console.error('❌ Falha no teste de conversão:', await conversionResponse.text());
        }

        console.log('👤 Testando rota de lead...');
        const leadResponse: ApiResponse = await fetch(`${baseUrl}/marketing/lead`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                sessionId,
                email: 'test@example.com',
                name: 'Usuário de Teste',
                source: 'test-form'
            })
        });

        if (leadResponse.ok) {
            console.log('✅ Teste de lead concluído com sucesso!');
        } else {
            console.error('❌ Falha no teste de lead:', await leadResponse.text());
        }

        console.log('🎉 Todos os testes concluídos!');

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('❌ Erro ao executar testes:', error.message);
        } else {
            console.error('❌ Erro ao executar testes:', String(error));
        }
    }
};

// Executa os testes
testAnalytics();
