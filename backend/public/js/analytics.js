/**
 * DevFerreiraG Analytics
 * Script para coleta de dados de analytics e marketing
 * v1.0.1
 */
(function() {
  // Configuração
  const config = {
    endpoint: '/analytics',
    marketingEndpoint: '/marketing',
    sessionIdKey: 'dvfg_session_id',
    sessionDuration: 30 * 60 * 1000, // 30 minutos
    trackingInterval: 60 * 1000, // Aumentado para 60 segundos (era 15 segundos)
    sendBeacons: true,
    trackClicks: true,
    trackPageViews: true,
    trackUTM: true,
    debug: false,
    consentRequired: true, // Nova opção para requisitar consentimento
    maxEventsBeforeSend: 5, // Novo - Acumular eventos até este número antes de enviar
    debounceTime: 500 // Novo - Tempo de debounce para eventos frequentes
  };

  // Estado
  let sessionId = null;
  let isActive = true;
  let lastActivity = Date.now();
  let referrer = document.referrer;
  let language = navigator.language || 'pt-BR';
  let utmParams = {};
  let hasConsent = false; // Novo estado para controle de consentimento
  let eventQueue = []; // Novo - Fila para acumular eventos
  let eventsTimer = null; // Novo - Timer para envio de eventos em lote
  let clickTimeout = null; // Novo - Para implementar debounce nos cliques

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

  // Novo - Função para sanitizar dados antes do envio
  const sanitizeData = (data) => {
    // Função para sanitizar campos específicos
    const sanitized = {...data};
    
    // Limitando comprimento de strings
    for (const key in sanitized) {
      if (typeof sanitized[key] === 'string') {
        sanitized[key] = sanitized[key].substring(0, 500);
      }
    }
    
    // Remover dados potencialmente sensíveis
    if (sanitized.userAgent) {
      // Sanitiza o user agent para conter apenas informações essenciais
      sanitized.userAgent = sanitized.userAgent.replace(/([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)/g, '[IP_REMOVED]');
    }
    
    return sanitized;
  };

  const getPlatformInfo = () => {
    const isMobile = /Mobile|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    return {
      platform: isMobile ? 'mobile' : 'desktop',
      // Capturar apenas informações de plataforma, não o user agent completo
      platformType: navigator.platform,
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

  // Novo - Sistema de consentimento
  const checkConsent = () => {
    if (!config.consentRequired) {
      hasConsent = true;
      return true;
    }
    
    hasConsent = localStorage.getItem('dvfg_analytics_consent') === 'true';
    
    if (!hasConsent) {
      showConsentBanner();
    }
    
    return hasConsent;
  };
  
  const showConsentBanner = () => {
    // Verificar se o banner já existe
    if (document.getElementById('analytics-consent-banner')) return;
    
    const banner = document.createElement('div');
    banner.id = 'analytics-consent-banner';
    banner.style.cssText = 'position: fixed; bottom: 0; left: 0; right: 0; background: #f8f9fa; padding: 15px; box-shadow: 0 -2px 10px rgba(0,0,0,0.1); z-index: 9999; font-family: sans-serif; text-align: center;';
    
    banner.innerHTML = `
      <p style="margin: 0 0 10px">Utilizamos cookies e técnicas similares para melhorar sua experiência. 
      Ao continuar navegando, você concorda com nossa política de privacidade.</p>
      <div>
        <button id="consent-accept" style="background: #007bff; color: white; border: none; padding: 8px 16px; margin-right: 10px; cursor: pointer; border-radius: 4px;">Aceitar</button>
        <button id="consent-reject" style="background: #f8f9fa; border: 1px solid #ddd; padding: 8px 16px; cursor: pointer; border-radius: 4px;">Rejeitar</button>
      </div>
    `;
    
    document.body.appendChild(banner);
    
    document.getElementById('consent-accept').addEventListener('click', () => {
      localStorage.setItem('dvfg_analytics_consent', 'true');
      hasConsent = true;
      banner.remove();
      init(); // Iniciar tracking após o consentimento
    });
    
    document.getElementById('consent-reject').addEventListener('click', () => {
      localStorage.setItem('dvfg_analytics_consent', 'false');
      hasConsent = false;
      banner.remove();
    });
  };

  // Novo - Envio em lote de eventos
  const queueEvent = (endpoint, payload) => {
    if (!hasConsent) return;
    
    eventQueue.push({ endpoint, payload });
    
    if (eventQueue.length >= config.maxEventsBeforeSend) {
      sendQueuedEvents();
    } else if (!eventsTimer) {
      // Configurar um timer para enviar eventos após um tempo, mesmo que não atinja o limite
      eventsTimer = setTimeout(sendQueuedEvents, 10000);
    }
  };
  
  const sendQueuedEvents = () => {
    if (eventQueue.length === 0) return;
    
    if (eventsTimer) {
      clearTimeout(eventsTimer);
      eventsTimer = null;
    }
    
    // Agrupar eventos por endpoint
    const eventsByEndpoint = {};
    
    eventQueue.forEach(event => {
      if (!eventsByEndpoint[event.endpoint]) {
        eventsByEndpoint[event.endpoint] = [];
      }
      eventsByEndpoint[event.endpoint].push(event.payload);
    });
    
    // Enviar eventos em lote para cada endpoint
    for (const endpoint in eventsByEndpoint) {
      fetch(`${endpoint}/batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          events: eventsByEndpoint[endpoint],
          timestamp: new Date().toISOString()
        }),
        // Remover credentials para melhorar privacidade
        // credentials: 'include'
      })
      .then(response => {
        if (response.ok) {
          log('Lote de eventos enviado', { endpoint, count: eventsByEndpoint[endpoint].length });
        }
      })
      .catch(error => {
        log('Erro ao enviar lote de eventos', error);
      });
    }
    
    // Limpar a fila após o envio
    eventQueue = [];
  };

  // Inicializar
  const init = () => {
    if (config.consentRequired && !checkConsent()) {
      log('Aguardando consentimento do usuário');
      return;
    }
    
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
    const activityInterval = setInterval(trackActivity, config.trackingInterval);
    
    // Enviar dados ao sair
    window.addEventListener('beforeunload', () => {
      // Limpar intervalos para evitar memory leaks
      clearInterval(activityInterval);
      
      if (config.sendBeacons && hasConsent) {
        sendBeacon('pageExit', {
          timeOnPage: Date.now() - lastActivity,
          exitUrl: document.location.href
        });
      }
      
      // Enviar quaisquer eventos pendentes
      sendQueuedEvents();
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
    if (!hasConsent) return;
    
    const data = sanitizeData({
      page: window.location.pathname,
      title: document.title,
      sessionId,
      referrer,
      language,
      ...getPlatformInfo(),
      performance: getPerformanceData(),
      timestamp: new Date().toISOString()
    });
    
    queueEvent(config.endpoint, {
      eventType: 'pageview',
      ...data
    });
  };

  // Rastrear UTM
  const trackUTM = (params) => {
    if (!hasConsent) return;
    
    queueEvent(config.marketingEndpoint, {
      eventType: 'utm',
      sessionId,
      ...sanitizeData(params)
    });
  };

  // Rastrear atividade
  const trackActivity = () => {
    if (!isActive || !hasConsent) return;
    
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

  // Rastrear cliques com debounce
  const handleClick = (event) => {
    if (!hasConsent) return;
    
    // Implementação de debounce para evitar múltiplos registros em cliques rápidos
    if (clickTimeout) {
      clearTimeout(clickTimeout);
    }
    
    clickTimeout = setTimeout(() => {
      processClick(event);
    }, config.debounceTime);
  };
  
  const processClick = (event) => {
    // Não rastrear cliques em elementos sensíveis
    if (event.target.type === 'password' || 
        event.target.classList.contains('no-track') || 
        event.target.closest('.no-track')) {
      return;
    }

    const target = event.target.closest('a, button') || event.target;
    const data = {
      sessionId,
      elementType: target.tagName.toLowerCase(),
      elementId: target.id || null,
      elementText: target.innerText?.trim().substring(0, 50) || null,
      elementClass: target.className || null,
      pageUrl: window.location.pathname,
      timestamp: new Date().toISOString()
    };

    // Para links
    if (target.tagName === 'A') {
      data.linkUrl = target.href;
      data.isExternal = target.host !== window.location.host;
      data.linkTarget = target.target;
    }

    queueEvent(config.endpoint, {
      eventType: 'click',
      ...sanitizeData(data)
    });
  };

  // Enviar beacon (para saída de página)
  const sendBeacon = (eventType, data) => {
    if (!hasConsent) return;
    
    const payload = JSON.stringify({
      eventType,
      sessionId,
      page: window.location.pathname,
      ...sanitizeData(data)
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
      if (!hasConsent) return;
      
      queueEvent(config.endpoint, {
        eventType,
        sessionId,
        page: window.location.pathname,
        ...sanitizeData(data)
      });
    },
    
    trackConversion: (type, value = null) => {
      if (!hasConsent) return;
      
      queueEvent(config.marketingEndpoint, {
        eventType: 'conversion',
        sessionId,
        type,
        value
      });
    },
    
    trackLead: (email, name = null, source = null) => {
      if (!hasConsent) return;
      
      // Anonimizar e-mail para maior privacidade
      const anonymizedEmail = email.split('@')[0].substring(0, 2) + '***@' + email.split('@')[1];
      
      queueEvent(config.marketingEndpoint, {
        eventType: 'lead',
        sessionId,
        email: anonymizedEmail,
        name: name ? name.split(' ')[0] + ' ' + (name.split(' ')[1] ? name.split(' ')[1][0] + '.' : '') : null,
        source: source || 'website'
      });
    },
    
    setDebug: (value) => {
      config.debug = !!value;
      log('Modo de depuração', config.debug ? 'ativado' : 'desativado');
    },
    
    getSessionId: () => sessionId,
    
    // Nova função para gerenciar o consentimento
    setConsent: (value) => {
      hasConsent = !!value;
      localStorage.setItem('dvfg_analytics_consent', hasConsent ? 'true' : 'false');
      
      if (hasConsent && !sessionId) {
        init();
      }
      
      return hasConsent;
    }
  };

  // Inicializar quando o documento estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(); 