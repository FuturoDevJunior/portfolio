# Sistema de SEO DevFerreiraG

Este documento descreve a implementação e configuração do sistema de SEO (Search Engine Optimization) do projeto DevFerreiraG.

## Visão Geral

O sistema de SEO foi projetado para otimizar a indexação e o posicionamento do site nos motores de busca, garantindo maior visibilidade e alcance online através de técnicas modernas de otimização.

## Componentes Principais

### 1. Metadados Dinâmicos

O sistema gera metadados otimizados para cada página do site:

```jsx
<Helmet>
  <title>{currentPage.title} | DevFerreiraG</title>
  <meta name="description" content={currentPage.description} />
  <meta name="keywords" content={currentPage.keywords.join(', ')} />
  <link rel="canonical" href={`https://www.devferreirag.com${currentPage.path}`} />
  <meta property="og:title" content={`${currentPage.title} | DevFerreiraG`} />
  <meta property="og:description" content={currentPage.description} />
  <meta property="og:url" content={`https://www.devferreirag.com${currentPage.path}`} />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://www.devferreirag.com/images/og-image.jpg" />
  <meta name="twitter:card" content="summary_large_image" />
</Helmet>
```

### 2. Esquemas Estruturados (JSON-LD)

Implementação de dados estruturados para rich snippets:

```jsx
<script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "DevFerreiraG Consultoria",
    "description": "Serviços de consultoria em desenvolvimento web e transformação digital",
    "url": "https://www.devferreirag.com",
    "logo": "https://www.devferreirag.com/images/logo.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "São Paulo",
      "addressRegion": "SP",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-23.5505",
      "longitude": "-46.6333"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+55-11-xxxx-xxxx",
      "contactType": "customer service",
      "email": "contato@devferreirag.com"
    },
    "sameAs": [
      "https://www.linkedin.com/in/devferreirag",
      "https://github.com/devferreirag"
    ]
  })}
</script>
```

### 3. Sitemap e Robots.txt

Configuração automática de sitemap XML e robots.txt:

#### Sitemap (`/backend/src/routes/sitemap.ts`)

```typescript
// Geração dinâmica de sitemap
router.get('/sitemap.xml', async (req: Request, res: Response) => {
  const pages = await getAllPages();
  const sitemap = generateSitemap(pages, 'https://www.devferreirag.com');
  
  res.header('Content-Type', 'application/xml');
  res.send(sitemap);
});
```

#### Robots.txt

```
User-agent: *
Allow: /

Sitemap: https://www.devferreirag.com/sitemap.xml

Disallow: /admin
Disallow: /api
Disallow: /*.json$
```

### 4. Otimização de URLs

Implementação de URLs amigáveis e semânticas:

```jsx
// Exemplo de configuração de rotas
<Route path="/servicos/:serviceSlug" component={ServicePage} />
<Route path="/portfolio/:projectSlug" component={ProjectPage} />
<Route path="/blog/:category/:postSlug" component={BlogPost} />
```

### 5. Internacionalização com hreflang

Suporte a múltiplos idiomas com tags hreflang apropriadas:

```jsx
<link rel="alternate" hreflang="pt-br" href="https://www.devferreirag.com/pt/servicos" />
<link rel="alternate" hreflang="en" href="https://www.devferreirag.com/en/services" />
<link rel="alternate" hreflang="es" href="https://www.devferreirag.com/es/servicios" />
<link rel="alternate" hreflang="x-default" href="https://www.devferreirag.com/pt/servicos" />
```

## Implementação no Backend

O backend fornece APIs específicas para suporte SEO:

### 1. Prerender para Crawlers

```typescript
// Middleware de detecção de crawlers
app.use(prerenderMiddleware);

// Configuração de prerender
const prerenderMiddleware = prerender.set('prerenderToken', process.env.PRERENDER_TOKEN)
  .set('protocol', 'https')
  .set('host', 'www.devferreirag.com')
  .set('forwardHeaders', true)
  .blacklisted([
    '^/api',
    '^/admin',
    '.*\\.json$'
  ]);
```

### 2. Headers HTTP para SEO

```typescript
// Headers para conteúdo comprimido
app.use(compression());

// Headers de segurança que também afetam SEO
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      // Configuração adequada para recursos externos
    }
  },
  // Permitir que o site seja incorporado apenas em nossos domínios
  frameguard: { action: 'sameorigin' },
  // Permite prefetch para melhor performance
  dnsPrefetchControl: { allow: true }
}));
```

## Métricas e Monitoramento

### 1. Monitoramento de Performance

```typescript
app.get('/api/seo/metrics', async (req: Request, res: Response) => {
  const metrics = await getSEOMetrics();
  res.json(metrics);
});
```

### 2. Teste de Carregamento

Funcionalidade para testar carregamento da página simulando diferentes dispositivos:

```typescript
app.get('/api/seo/lighthouse-test', async (req: Request, res: Response) => {
  const { url, device = 'mobile' } = req.query;
  const result = await runLighthouseTest(url as string, device as string);
  res.json(result);
});
```

## Boas Práticas Implementadas

1. **Performance Web Otimizada**
   - Carregamento prioritário de CSS crítico
   - Lazy loading de imagens e componentes
   - Minificação e compressão de recursos

2. **Conteúdo Otimizado**
   - Estrutura HTML semântica
   - Imagens com atributos alt descritivos
   - Textos com densidade adequada de palavras-chave

3. **Responsividade**
   - Design mobile-first
   - Viewport configurado corretamente
   - Teste em múltiplos dispositivos

4. **Acessibilidade**
   - Conformidade WCAG 2.1 AA
   - Suporte a tecnologias assistivas
   - Testes com leitores de tela

## Integração com Analytics

O sistema de SEO é integrado com o sistema de analytics para monitorar:

- Termos de busca que levam ao site
- Taxa de cliques (CTR) em resultados de busca
- Posições médias para palavras-chave estratégicas
- Páginas mais acessadas via busca orgânica

## Referências

- [Documentação completa de implementação](/backend/src/routes/seo.ts)
- [Configuração de robots.txt](/public/robots.txt)
- [Regras de redirecionamento](/backend/src/routes/redirects.ts) 