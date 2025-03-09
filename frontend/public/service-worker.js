const CACHE_NAME = 'devferreirag-v1';
const FORM_QUEUE_NAME = 'contact-form-queue';

// Lista de recursos essenciais para cache
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/vite.svg',
  '/manifest.json'
];

// Cria um objeto store para armazenar submissões de formulário offline
const createFormDataStore = async () => {
  // Utiliza IndexedDB para armazenar dados de formulário quando offline
  if ('indexedDB' in self) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('ContactFormDB', 1);
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(FORM_QUEUE_NAME)) {
          db.createObjectStore(FORM_QUEUE_NAME, { autoIncrement: true });
        }
      };
      
      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
      
      request.onerror = (event) => {
        console.error('IndexedDB error:', event.target.error);
        reject(event.target.error);
      };
    });
  }
  
  return null;
};

// Armazena dados do formulário para envio posterior
const storeFormData = async (formData) => {
  try {
    const db = await createFormDataStore();
    if (!db) return false;
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([FORM_QUEUE_NAME], 'readwrite');
      const store = transaction.objectStore(FORM_QUEUE_NAME);
      const request = store.add({
        formData,
        timestamp: new Date().toISOString()
      });
      
      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(false);
    });
  } catch (error) {
    console.error('Error storing form data:', error);
    return false;
  }
};

// Recupera e processa todos os formulários armazenados
const processQueuedForms = async () => {
  try {
    const db = await createFormDataStore();
    if (!db) return;
    
    const transaction = db.transaction([FORM_QUEUE_NAME], 'readwrite');
    const store = transaction.objectStore(FORM_QUEUE_NAME);
    const request = store.getAll();
    
    request.onsuccess = async () => {
      const forms = request.result;
      if (forms && forms.length) {
        console.log(`Processando ${forms.length} formulários em fila`);
        
        for (const form of forms) {
          try {
            // Tentativa de envio do formulário
            const response = await fetch('/api/contact', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(form.formData)
            });
            
            if (response.ok) {
              // Remove do banco de dados se enviado com sucesso
              const deleteTransaction = db.transaction([FORM_QUEUE_NAME], 'readwrite');
              const deleteStore = deleteTransaction.objectStore(FORM_QUEUE_NAME);
              deleteStore.delete(form.id);
              console.log('Formulário processado com sucesso');
            }
          } catch (error) {
            console.error('Falha ao processar formulário:', error);
            // Deixa no banco para tentar novamente depois
          }
        }
      }
    };
    
    request.onerror = (event) => {
      console.error('Erro ao recuperar formulários:', event.target.error);
    };
  } catch (error) {
    console.error('Erro ao processar formulários em fila:', error);
  }
};

// Instalação do service worker e cache inicial
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Limpeza de caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Estratégia de cache: Stale-While-Revalidate
self.addEventListener('fetch', (event) => {
  // Captura tentativas de envio de formulário quando offline
  if (event.request.method === 'POST' && event.request.url.includes('/api/contact')) {
    // Armazena os dados do formulário para processamento posterior
    event.respondWith(
      fetch(event.request.clone())
        .catch(async (error) => {
          // Se falhar (offline), armazene para sincronização posterior
          try {
            const formData = await event.request.json();
            await storeFormData(formData);
            
            // Retorna uma resposta simulada para não quebrar a experiência do usuário
            return new Response(JSON.stringify({
              success: true,
              offline: true,
              message: 'Formulário salvo para envio quando a conexão for restabelecida'
            }), {
              headers: { 'Content-Type': 'application/json' },
              status: 202
            });
          } catch (err) {
            console.error('Erro ao processar formulário offline:', err);
            return new Response(JSON.stringify({
              success: false,
              message: 'Não foi possível salvar o formulário offline'
            }), {
              headers: { 'Content-Type': 'application/json' },
              status: 500
            });
          }
        })
    );
    return;
  }

  // Ignorar requisições que não sejam GET
  if (event.request.method !== 'GET') return;

  // Ignorar requisições de API
  if (event.request.url.includes('/api/')) return;

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Atualizar cache em segundo plano
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            // Não armazenar respostas inválidas
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            // Armazenar a nova resposta no cache
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return networkResponse;
          })
          .catch(() => {
            // Em caso de falha de rede, tentar servir páginas HTML para rotas conhecidas
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('/');
            }
            return null;
          });

        // Retornar a resposta do cache enquanto atualiza em segundo plano
        return cachedResponse || fetchPromise;
      })
  );
});

// Sincronização em segundo plano para envio de formulários
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form-submit') {
    event.waitUntil(
      processQueuedForms()
    );
  }
});

// Verifica periodicamente se há formulários para enviar (a cada 30 minutos)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'contact-form-retry') {
    event.waitUntil(processQueuedForms());
  }
});

// Quando a conexão é restabelecida
self.addEventListener('online', () => {
  processQueuedForms();
});

// Notificações push
self.addEventListener('push', (event) => {
  const data = event.data.json();
  
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/vite.svg',
      badge: '/vite.svg',
      data: data.url
    })
  );
});

// Clique na notificação
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.notification.data) {
    event.waitUntil(
      clients.openWindow(event.notification.data)
    );
  }
}); 