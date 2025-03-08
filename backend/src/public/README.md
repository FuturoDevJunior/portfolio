# DevFerreiraG API - Backend Otimizado para SEO

Este é o backend da aplicação DevFerreiraG, oferecendo recursos avançados de SEO, analytics e marketing para garantir visibilidade nas pesquisas e monitorar a performance do site.

## 🚀 Características

- **SEO Avançado**: Geração dinâmica de metadados, sitemap XML, schemas e structured data
- **Analytics**: Coleta e análise de dados de usuário com rastreamento anônimo
- **Marketing**: Rastreamento de campanhas, UTM e análise de conversão
- **Segurança**: Proteção contra ataques comuns como XSS e SQL Injection
- **Performance**: Compressão, cache e otimização para alta disponibilidade
- **Multilíngue**: Suporte completo para múltiplos idiomas (PT, EN, ES)

## 🔧 Tecnologias

- Node.js com Express
- TypeScript
- API RESTful
- Middleware Prerender para otimização de SEO em SPAs
- Cache inteligente e rate limiting
- Detecção automática de bots

## 📋 Requisitos

- Node.js 20+ (testado com v20.18.3)
- NPM 10+ (testado com v10.8.2)

## 🛠️ Instalação

1. Clone o repositório
2. Instale as dependências:

```bash
cd backend
npm install
```

3. Configure o arquivo `.env` com suas variáveis de ambiente (use `.env.example` como referência)
4. Compile o TypeScript:

```bash
npm run build
```

5. Inicie o servidor:

```bash
npm start
```

Para desenvolvimento:

```bash
npm run dev
```

Para produção:

```bash
npm run start:prod
```

## 📊 Integrações

### Google Analytics

O backend prepara e envia dados para o Google Analytics 4, com estas métricas:

- Pageviews e eventos de usuário
- Tempo na página e taxa de rejeição
- Conversões e leads
- Comportamento de usuário por dispositivo/localização

### SEO

- **Sitemap dinâmico**: Gerado automaticamente com prioridades otimizadas
- **Robots.txt**: Configurado para indexação eficiente
- **Structured Data**: JSON-LD para rich snippets no Google
- **Meta tags dinâmicas**: Otimizadas para cada página
- **Prerender**: Renderização do lado do servidor para crawlers

### Marketing

- **UTM Tracking**: Rastreamento completo de campanhas
- **Conversões**: Análise de funil e taxas de conversão
- **A/B Testing**: Ferramentas para testes de variantes
- **Heatmaps**: Integração com ferramentas de mapa de calor

## 🔍 Endpoints Principais

- `/api/*`: Endpoints para dados dinâmicos
- `/seo/*`: Endpoints relacionados a SEO
- `/analytics/*`: Endpoints para coleta e análise de dados
- `/marketing/*`: Endpoints para campanhas e conversões
- `/sitemap.xml`: Sitemap XML dinâmico

## ⚙️ Configuração

A configuração é feita através do arquivo `.env`, com as seguintes opções:

```
# Configurações gerais
PORT=3001
NODE_ENV=production

# Segurança
ADMIN_API_KEY=your_key_here
ENABLE_HELMET=true
ENABLE_CSRF=true

# SEO
SITE_DOMAIN=devferreirag.com
ENABLE_STRUCTURED_DATA=true
PRERENDER_TOKEN=your_token_here

# Analytics
ANALYTICS_RETENTION_DAYS=90
COLLECT_IP_ADDRESSES=false
ANONYMIZE_IPS=true

# Performance
ENABLE_COMPRESSION=true
STATIC_FILES_MAX_AGE=2592000
```

## 📦 Arquivos Gerados para SEO

O backend gera e serve os seguintes arquivos:

- `/robots.txt`: Instruções para crawlers de busca
- `/sitemap.xml`: Mapa do site para indexação
- `/js/seo-enhancer.js`: Script que melhora SEO do lado do cliente
- `/js/analytics.js`: Script para coleta de métricas de uso

## 🚀 Deploy em Produção

Para realizar o deploy em produção:

1. Configure as variáveis de ambiente para produção
2. Execute o build do projeto:
   ```bash
   npm run build
   ```
3. Inicie o servidor em modo produção:
   ```bash
   npm run start:prod
   ```

Recomendações para produção:
- Use HTTPS para todas as conexões
- Configure um proxy reverso (Nginx ou similar)
- Utilize um processo de CI/CD para automação do deploy
- Monitore os logs e configure alertas para erros 