# SEO e Analytics Backend

Este repositório contém a implementação do backend para suporte a SEO, analytics e marketing do projeto DevFerreiraG.

## Visão Geral

A aplicação fornece endpoints para coleta e análise de dados de usuário, respeitando normas de privacidade (GDPR/LGPD) e otimizando a experiência do usuário.

## Recursos

### Analytics

- **Rastreamento de visualizações de página**: Captura dados de visualização com métricas de performance
- **Rastreamento de eventos**: Sistema para acompanhar interações do usuário (cliques, formulários, etc.)
- **Rastreamento UTM**: Captura parâmetros de campanhas (utm_source, utm_medium, etc.)
- **Métricas de performance**: Coleta de dados sobre carregamento da página e renderização

### Marketing

- **Gerenciamento de leads**: Captura e processamento seguro de leads
- **Rastreamento de conversões**: Acompanhamento de ações importantes
- **Integração com campanhas**: Dados para análise de eficácia de campanhas

### Privacidade e Segurança

- **Sistema de consentimento**: Banner de cookies e controle de consentimento
- **Anonimização de dados**: Proteção de informações pessoais sensíveis
- **Processamento em lote**: Redução de requisições para melhor performance

## Instalação e Configuração

### Pré-requisitos

- Node.js 14+
- PM2 (para ambiente de produção)

### Configuração

1. Clone o repositório
2. Instale as dependências:
   ```
   npm run setup
   ```
3. Configure as variáveis de ambiente:
   ```
   cp .env.example .env
   ```
   Edite o arquivo `.env` com suas configurações

### Execução

**Desenvolvimento**:
```
npm run dev
```

**Produção**:
```
npm run start:prod
```

## Endpoints da API

### Analytics

- `POST /analytics/pageview`: Registra visualizações de página
- `POST /analytics/event`: Registra eventos de usuário
- `POST /analytics/batch`: Aceita múltiplos eventos em uma requisição (pageview, click, event, etc.)
- `GET /analytics/metrics`: Obtém métricas agregadas de uso (requer autenticação)

### Marketing

- `POST /marketing/track`: Registra parâmetros UTM
- `POST /marketing/conversion`: Registra conversões
- `POST /marketing/lead`: Registra leads
- `GET /marketing/stats`: Obtém estatísticas agregadas de marketing (requer autenticação)

## Implementando no Frontend

Para adicionar o rastreamento ao frontend, inclua o script:

```html
<script src="/js/analytics.js"></script>
```

### API do Cliente

```javascript
// Rastrear evento
DevFerreiraAnalytics.trackEvent('download', { fileId: '123', fileName: 'ebook.pdf' });

// Rastrear conversão
DevFerreiraAnalytics.trackConversion('purchase', 99.90);

// Rastrear lead
DevFerreiraAnalytics.trackLead('email@exemplo.com', 'Nome Completo', 'formulário de contato');

// Ativar modo de depuração
DevFerreiraAnalytics.setDebug(true);

// Gerenciar consentimento manualmente
DevFerreiraAnalytics.setConsent(true);
```

## Política de Retenção de Dados

Por padrão, os dados são retidos por 26 meses. Para alterar este comportamento, modifique as configurações de retenção no arquivo de configuração.

## Licença

Proprietária - DevFerreiraG © 2023 