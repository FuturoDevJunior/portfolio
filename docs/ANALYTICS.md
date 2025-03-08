# Sistema de Analytics DevFerreiraG

Este documento descreve o sistema de analytics implementado no projeto DevFerreiraG, detalhando sua arquitetura, funcionalidades e uso.

## Visão Geral

O sistema de analytics foi projetado para rastrear e analisar o comportamento dos usuários no site, fornecendo insights valiosos sobre interações, características dos dispositivos e métricas de desempenho, tudo isso respeitando a privacidade dos usuários.

## Arquitetura

O sistema consiste em duas partes principais:

### 1. Biblioteca de Cliente (Frontend)

Localizada em `/backend/public/js/analytics.js`, esta biblioteca é responsável por:

- Coletar eventos do lado do cliente
- Processar dados antes do envio para o servidor
- Gerenciar consentimento do usuário (conformidade GDPR/LGPD)
- Agrupar eventos em lotes para reduzir o número de requisições

### 2. API de Analytics (Backend)

Implementada em `/backend/src/routes/analytics.ts` e `/backend/src/routes/marketing.ts`, a API é responsável por:

- Receber e processar eventos enviados pelo cliente
- Armazenar dados de forma segura e anônima
- Agregar métricas para análise
- Fornecer endpoints para consulta de dados

## Métricas Coletadas

### Métricas de Acesso

- **Visualizações de Página**: Número de visualizações por página
- **Usuários Únicos**: Visitantes distintos (baseado em ID de sessão)
- **Tempo na Página**: Duração média das visitas
- **Taxa de Rejeição**: Porcentagem de visitas de página única
- **Origem do Tráfego**: Referrers e UTM parameters

### Métricas de Interação

- **Cliques**: Interações com elementos clicáveis
- **Scrolling**: Profundidade de rolagem nas páginas
- **Conversões**: Ações valiosas (preenchimento de formulário, etc.)

### Métricas Técnicas

- **Tipo de Dispositivo**: Desktop, tablet, mobile
- **Navegador**: Chrome, Firefox, Safari, etc.
- **Sistema Operacional**: Windows, macOS, Android, iOS, etc.
- **Métricas de Performance**: Tempo de carregamento, renderização, etc.

## Privacidade e Conformidade

### Consentimento do Usuário

O sistema requer consentimento explícito do usuário antes de iniciar o rastreamento:

```javascript
// Verificar consentimento
if (localStorage.getItem('dvfg_analytics_consent') !== 'true') {
    // Mostrar banner de consentimento
    showConsentBanner();
}
```

### Anonimização de Dados

Dados sensíveis são anonimizados antes do armazenamento:

- Endereços de e-mail são mascarados (ex: jo***@exemplo.com)
- IPs são truncados ou hash-ificados
- Identificadores persistentes são evitados

### Retenção de Dados

Os dados são mantidos por um período limitado (26 meses por padrão) e depois são automaticamente excluídos.

## Uso do Sistema

### Incluindo o Script

```html
<script src="/js/analytics.js"></script>
```

### API JavaScript

```javascript
// Rastrear um evento personalizado
DevFerreiraAnalytics.trackEvent('button_click', { 
    buttonId: 'contact-submit',
    category: 'engagement'
});

// Rastrear uma conversão
DevFerreiraAnalytics.trackConversion('signup', {
    value: 50,
    category: 'acquisition'
});

// Rastrear um lead
DevFerreiraAnalytics.trackLead('email@exemplo.com', 'Nome', 'formulário de contato');

// Ativar modo de debug
DevFerreiraAnalytics.setDebug(true);

// Gerenciar consentimento manualmente
DevFerreiraAnalytics.setConsent(true);
```

### Endpoints de API

- **POST /analytics/pageview**: Registra visualizações de página
- **POST /analytics/event**: Registra eventos do usuário
- **POST /analytics/batch**: Processa eventos em lote
- **GET /analytics/metrics**: Obtém métricas agregadas (requer autenticação)

## Visualização de Dados

Os dados coletados podem ser visualizados:

1. **API de Métricas**: Endpoint autenticado para obter dados brutos
2. **Dashboard**: Interface visual para análise (em desenvolvimento)
3. **Exportação**: Funcionalidade para exportar dados em formatos como CSV ou JSON

## Extensão do Sistema

O sistema foi projetado para ser extensível:

- Novos tipos de eventos podem ser adicionados
- Métricas personalizadas podem ser implementadas
- Integrações com plataformas externas são possíveis

## Resolução de Problemas

### Logs

Os logs de analytics estão disponíveis em:

- `/backend/logs/analytics.log`

### Modo de Debug

Ative o modo de debug para logs detalhados:

```javascript
DevFerreiraAnalytics.setDebug(true);
```

## Referências

- [Documentação técnica completa](/backend/src/routes/analytics.ts)
- [Biblioteca de cliente](/backend/public/js/analytics.js)
- [Especificação de API](/backend/src/routes/README.md) 