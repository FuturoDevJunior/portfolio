/**
 * DevFerreiraG Analytics
 * Script para coleta de dados de analytics e marketing
 * v1.0.0
 */
(function() {
  // Configuração
  const config = {
    endpoint: '/analytics',
    marketingEndpoint: '/marketing',
    sessionIdKey: 'dvfg_session_id',
    sessionDuration: 30 * 60 * 1000, // 30 minutos
    trackingInterval: 15 * 1000, // 15 segundos
    sendBeacons: true,
    trackClicks: true,
    trackPageViews: true,
    trackUTM: true,
    debug: false
  };

  // Estado
  let sessionId = null;
  let isActive = true;
  let lastActivity = Date.now();
  let referrer = document.referrer;
  let language = navigator.language || 'pt-BR';
  let utmParams = {};

  // Utilitários
  const log = (message, data) => {
    if (config.debug) {
      console.log(`[DevFerreiraG Analytics] ${message}`, data || '');
    }
  };

  const generateId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const getPlatformInfo = () => {
    const isMobile = /Mobile|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    return {
      platform: isMobile ? 'mobile' : 'desktop',
      userAgent: navigator.userAgent,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      language: navigator.language
    };
  };

  const getPerformanceData = () => {
    if (!window.performance || !window.performance.timing) return {};
    
    const timing = window.performance.timing;
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    const dnsTime = timing.domainLookupEnd - timing.domainLookupStart;
    const tcpTime = timing.connectEnd - timing.connectStart;
    const serverTime = timing.responseEnd - timing.requestStart;
    const renderTime = timing.loadEventEnd - timing.domLoading;
    
    return {
      loadTime,
      dnsTime,
      tcpTime,
      serverTime,
      renderTime
    };
  };

  // Inicializar
  const init = () => {
    // Gerar ou recuperar ID de sessão
    sessionId = localStorage.getItem(config.sessionIdKey);
    if (!sessionId) {
      sessionId = generateId();
      localStorage.setItem(config.sessionIdKey, sessionId);
      setTimeout(() => localStorage.removeItem(config.sessionIdKey), config.sessionDuration);
    }

    // Extrair UTM params da URL
    if (config.trackUTM) {
      parseUTMParams();
    }

    // Registrar visualização de página
    if (config.trackPageViews) {
      trackPageView();
    }
    
    // Adicionar ouvintes de eventos
    if (config.trackClicks) {
      document.addEventListener('click', handleClick);
    }
    
    window.addEventListener('blur', () => { isActive = false; });
    window.addEventListener('focus', () => { 
      isActive = true;
      lastActivity = Date.now();
    });
    
    // Monitorar atividade
    setInterval(trackActivity, config.trackingInterval);
    
    // Enviar dados ao sair
    window.addEventListener('beforeunload', () => {
      if (config.sendBeacons) {
        sendBeacon('pageExit', {
          timeOnPage: Date.now() - lastActivity,
          exitUrl: document.location.href
        });
      }
    });
    
    log('Inicializado', { sessionId });
  };

  // Extrair parâmetros UTM
  const parseUTMParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const params = {};
    
    ['source', 'medium', 'campaign', 'content', 'term'].forEach(param => {
      const value = urlParams.get(`utm_${param}`);
      if (value) {
        params[param] = value;
      }
    });
    
    if (Object.keys(params).length > 0) {
      utmParams = params;
      trackUTM(params);
      log('UTM Params detectados', params);
    }
  };

  // Rastrear visualização de página
  const trackPageView = () => {
    const data = {
      page: window.location.pathname,
      title: document.title,
      sessionId,
      referrer,
      language,
      ...getPlatformInfo(),
      performance: getPerformanceData(),
      timestamp: new Date().toISOString()
    };
    
    fetch(`${config.endpoint}/pageview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include'
    })
    .then(response => {
      if (response.ok) {
        log('Visualização de página registrada', { page: data.page });
      }
    })
    .catch(error => {
      log('Erro ao registrar visualização', error);
    });
  };

  // Rastrear UTM
  const trackUTM = (params) => {
    fetch(`${config.marketingEndpoint}/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        ...params
      }),
      credentials: 'include'
    })
    .then(response => {
      if (response.ok) {
        log('UTM registrado', params);
      }
    })
    .catch(error => {
      log('Erro ao registrar UTM', error);
    });
  };

  // Rastrear atividade
  const trackActivity = () => {
    if (!isActive) return;
    
    const now = Date.now();
    const timeSinceLastActivity = now - lastActivity;
    
    if (timeSinceLastActivity > config.sessionDuration) {
      // Renovar sessão
      sessionId = generateId();
      localStorage.setItem(config.sessionIdKey, sessionId);
      log('Sessão renovada', { sessionId });
    }
    
    lastActivity = now;
  };

  // Rastrear cliques
  const handleClick = (event) => {
    // Não rastrear cliques em elementos sensíveis
    if (event.target.type === 'password' || event.target.classList.contains('no-track')) {
      return;
    }

    const target = event.target.closest('a, button') || event.target;
    const data = {
      sessionId,
      elementType: target.tagName.toLowerCase(),
      elementId: target.id || null,
      elementText: target.innerText?.trim().substring(0, 50) || null,
      elementClass: target.className || null,
      pageUrl: window.location.href,
      timestamp: new Date().toISOString()
    };

    // Para links
    if (target.tagName === 'A') {
      data.linkUrl = target.href;
      data.isExternal = target.host !== window.location.host;
      data.linkTarget = target.target;
    }

    fetch(`${config.endpoint}/event`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventType: 'click',
        sessionId,
        page: window.location.pathname,
        ...data
      }),
      credentials: 'include'
    })
    .then(response => {
      if (response.ok) {
        log('Clique registrado', data);
      }
    })
    .catch(error => {
      log('Erro ao registrar clique', error);
    });
  };

  // Enviar beacon (para saída de página)
  const sendBeacon = (eventType, data) => {
    const payload = JSON.stringify({
      eventType,
      sessionId,
      page: window.location.pathname,
      ...data
    });
    
    if (navigator.sendBeacon) {
      navigator.sendBeacon(`${config.endpoint}/event`, payload);
      log('Beacon enviado', data);
    } else {
      // Fallback para fetch
      fetch(`${config.endpoint}/event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true
      });
    }
  };

  // API pública
  window.DevFerreiraAnalytics = {
    trackEvent: (eventType, data = {}) => {
      fetch(`${config.endpoint}/event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType,
          sessionId,
          page: window.location.pathname,
          ...data
        }),
        credentials: 'include'
      })
      .then(response => {
        if (response.ok) {
          log('Evento registrado', { eventType, ...data });
        }
      })
      .catch(error => {
        log('Erro ao registrar evento', error);
      });
    },
    
    trackConversion: (type, value = null) => {
      fetch(`${config.marketingEndpoint}/conversion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          type,
          value
        }),
        credentials: 'include'
      })
      .then(response => {
        if (response.ok) {
          log('Conversão registrada', { type, value });
        }
      })
      .catch(error => {
        log('Erro ao registrar conversão', error);
      });
    },
    
    trackLead: (email, name = null, source = null) => {
      fetch(`${config.marketingEndpoint}/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          email,
          name,
          source: source || 'website'
        }),
        credentials: 'include'
      })
      .then(response => {
        if (response.ok) {
          log('Lead registrado', { email, name, source });
        }
      })
      .catch(error => {
        log('Erro ao registrar lead', error);
      });
    },
    
    setDebug: (value) => {
      config.debug = !!value;
      log('Modo de depuração', config.debug ? 'ativado' : 'desativado');
    },
    
    getSessionId: () => sessionId
  };

  // Inicializar quando o documento estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(); 