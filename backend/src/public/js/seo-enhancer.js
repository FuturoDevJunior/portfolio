/**
 * DevFerreiraG SEO Enhancer
 * Script para otimização SEO dinâmica
 * v1.0.0
 */
(function() {
  // Configuração
  const config = {
    endpoint: '/seo',
    enableStructuredData: true,
    enableMetaUpdates: true,
    enableHreflang: true,
    enableLazyLoading: true,
    enablePerformance: true,
    debug: false
  };

  // Estado
  let currentPath = window.location.pathname;
  let currentLang = document.documentElement.lang.split('-')[0] || 'pt';

  // Utilitários
  const log = (message, data) => {
    if (config.debug) {
      console.log(`[DevFerreiraG SEO] ${message}`, data || '');
    }
  };

  // Inicializar
  const init = () => {
    // Atualizar metadados
    if (config.enableMetaUpdates) {
      updateMetadata();
    }

    // Adicionar dados estruturados
    if (config.enableStructuredData) {
      addStructuredData();
    }

    // Configurar hreflang
    if (config.enableHreflang) {
      setupHreflang();
    }

    // Otimizar imagens
    if (config.enableLazyLoading) {
      optimizeImages();
    }

    // Otimização de performance
    if (config.enablePerformance) {
      optimizePerformance();
    }

    // Ouvir mudanças de URL para aplicativos SPA
    listenToUrlChanges();

    log('SEO Enhancer inicializado', { path: currentPath, lang: currentLang });
  };

  // Atualizar metadados
  const updateMetadata = () => {
    fetch(`${config.endpoint}/metadata?page=${encodeURIComponent(currentPath)}&lang=${currentLang}`)
      .then(response => response.json())
      .then(data => {
        // Atualizar título
        if (data.title) {
          document.title = data.title;
        }

        // Atualizar descrição
        let descMeta = document.querySelector('meta[name="description"]');
        if (!descMeta) {
          descMeta = document.createElement('meta');
          descMeta.setAttribute('name', 'description');
          document.head.appendChild(descMeta);
        }
        descMeta.setAttribute('content', data.description);

        // Atualizar keywords
        if (data.keywords && data.keywords.length) {
          let keywordsMeta = document.querySelector('meta[name="keywords"]');
          if (!keywordsMeta) {
            keywordsMeta = document.createElement('meta');
            keywordsMeta.setAttribute('name', 'keywords');
            document.head.appendChild(keywordsMeta);
          }
          keywordsMeta.setAttribute('content', Array.isArray(data.keywords) ? data.keywords.join(', ') : data.keywords);
        }

        // Atualizar URL canônica
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
          canonicalLink = document.createElement('link');
          canonicalLink.setAttribute('rel', 'canonical');
          document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute('href', data.canonical || window.location.href);

        // Atualizar Open Graph
        updateOpenGraph(data);

        log('Metadados atualizados', data);
      })
      .catch(error => {
        log('Erro ao atualizar metadados', error);
      });
  };

  // Atualizar tags Open Graph
  const updateOpenGraph = (data) => {
    // Função auxiliar para atualizar ou criar meta tags
    const updateMetaTag = (property, content) => {
      if (!content) return;
      
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateMetaTag('og:title', data.title);
    updateMetaTag('og:description', data.description);
    updateMetaTag('og:url', data.canonical || window.location.href);
    updateMetaTag('og:type', data.ogType || 'website');
    updateMetaTag('og:image', data.imageUrl);
    
    // Twitter Card
    updateMetaTag('twitter:card', data.twitterCard || 'summary_large_image');
    updateMetaTag('twitter:title', data.title);
    updateMetaTag('twitter:description', data.description);
    updateMetaTag('twitter:image', data.imageUrl);
  };

  // Adicionar dados estruturados (JSON-LD)
  const addStructuredData = () => {
    fetch(`${config.endpoint}/schema-markup?page=${encodeURIComponent(currentPath)}`)
      .then(response => response.json())
      .then(data => {
        // Remover quaisquer scripts JSON-LD existentes
        const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
        existingScripts.forEach(script => script.remove());

        // Adicionar novos scripts JSON-LD
        const schemas = Array.isArray(data) ? data : [data];
        schemas.forEach(schema => {
          const script = document.createElement('script');
          script.type = 'application/ld+json';
          script.textContent = JSON.stringify(schema);
          document.head.appendChild(script);
        });

        log('Dados estruturados adicionados', schemas);
      })
      .catch(error => {
        log('Erro ao adicionar dados estruturados', error);
      });
  };

  // Configurar tags hreflang para suporte multilíngue
  const setupHreflang = () => {
    // Idiomas suportados
    const languages = ['pt', 'en', 'es'];
    
    // Remover hreflangs existentes
    document.querySelectorAll('link[hreflang]').forEach(link => link.remove());
    
    // Calcular rota base sem o prefixo de idioma
    let basePath = currentPath;
    for (const lang of languages) {
      if (currentPath.startsWith(`/${lang}/`) || currentPath === `/${lang}`) {
        basePath = currentPath.substring(lang.length + 1) || '/';
        break;
      }
    }
    
    // Adicionar as tags hreflang para cada idioma
    languages.forEach(lang => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = lang === 'pt' ? 'pt-BR' : (lang === 'en' ? 'en-US' : 'es-ES');
      
      // Construir URL para este idioma
      const langUrl = lang === 'pt' 
        ? `${window.location.origin}${basePath}`
        : `${window.location.origin}/${lang}${basePath === '/' ? '' : basePath}`;
        
      link.href = langUrl;
      document.head.appendChild(link);
    });
    
    // Adicionar x-default
    const defaultLink = document.createElement('link');
    defaultLink.rel = 'alternate';
    defaultLink.hreflang = 'x-default';
    defaultLink.href = `${window.location.origin}${basePath}`;
    document.head.appendChild(defaultLink);
    
    log('Tags hreflang configuradas', { basePath, languages });
  };

  // Otimizar imagens para carregamento
  const optimizeImages = () => {
    // Adicionar loading=lazy para imagens que não estão visíveis inicialmente
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
      
      // Certificar que todas as imagens têm atributo alt
      if (!img.hasAttribute('alt')) {
        // Tenta extrair algum contexto do parent ou próximos elementos
        const parentText = img.parentElement.textContent?.trim();
        if (parentText && parentText.length < 100) {
          img.setAttribute('alt', parentText);
        } else {
          img.setAttribute('alt', ''); // alt vazio para imagens decorativas
        }
      }
    });
    
    log('Imagens otimizadas', { count: images.length });
  };

  // Otimização de performance
  const optimizePerformance = () => {
    // Adicionar hints de preload/prefetch para navegação provável
    const addResourceHint = (href, type, as) => {
      if (!href || document.querySelector(`link[href="${href}"][rel="${type}"]`)) return;
      
      const link = document.createElement('link');
      link.rel = type;
      link.href = href;
      if (as) link.as = as;
      document.head.appendChild(link);
    };
    
    // Prefetch de páginas prováveis de ser visitadas
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
      // Não prefetch páginas externas, só internas
      if (link.host === window.location.host) {
        addResourceHint(link.href, 'prefetch', 'document');
      }
    });
    
    // Preconectar com domínios externos importantes
    addResourceHint('https://fonts.googleapis.com', 'preconnect');
    addResourceHint('https://fonts.gstatic.com', 'preconnect');
    addResourceHint('https://www.google-analytics.com', 'preconnect');
    
    log('Performance otimizada');
  };

  // Ouvir mudanças de URL para SPAs
  const listenToUrlChanges = () => {
    // Usar um MutationObserver para detectar mudanças no DOM que podem indicar navegação em SPAs
    const observer = new MutationObserver((mutations) => {
      if (window.location.pathname !== currentPath) {
        currentPath = window.location.pathname;
        
        // Verificar se o idioma foi alterado na URL
        const langMatch = currentPath.match(/^\/(pt|en|es)($|\/)/);
        if (langMatch) {
          currentLang = langMatch[1];
        }
        
        // Atualizar o SEO para a nova página
        updateMetadata();
        addStructuredData();
        
        log('URL alterada, SEO atualizado', { path: currentPath, lang: currentLang });
      }
    });
    
    // Iniciar observação
    observer.observe(document, { subtree: true, childList: true });
    
    // Interceptar o pushState e replaceState para SPAs
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;
    
    history.pushState = function() {
      originalPushState.apply(this, arguments);
      observer.takeRecords(); // limpar registros existentes
      if (window.location.pathname !== currentPath) {
        currentPath = window.location.pathname;
        updateMetadata();
        addStructuredData();
        log('pushState detectado, SEO atualizado', { path: currentPath });
      }
    };
    
    history.replaceState = function() {
      originalReplaceState.apply(this, arguments);
      observer.takeRecords();
      if (window.location.pathname !== currentPath) {
        currentPath = window.location.pathname;
        updateMetadata();
        addStructuredData();
        log('replaceState detectado, SEO atualizado', { path: currentPath });
      }
    };
    
    // Ouvir eventos de navegação
    window.addEventListener('popstate', () => {
      if (window.location.pathname !== currentPath) {
        currentPath = window.location.pathname;
        updateMetadata();
        addStructuredData();
        log('popstate detectado, SEO atualizado', { path: currentPath });
      }
    });
  };

  // API pública
  window.DevFerreiraSEO = {
    refresh: () => {
      updateMetadata();
      addStructuredData();
      setupHreflang();
      optimizeImages();
      log('SEO Refresh manual executado');
    },
    
    setDebug: (value) => {
      config.debug = !!value;
      log('Modo de depuração', config.debug ? 'ativado' : 'desativado');
    }
  };

  // Inicializar quando o documento estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(); 