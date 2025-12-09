// Service Worker para Consulta Loterias
// Versao do cache - incrementar quando houver mudancas
const CACHE_VERSION = 'loteria-cache-v1';

// Arquivos para cache durante a instalacao
const STATIC_CACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './styles.css',
  './app.js',
  './config.js',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// Evento de instalacao - cacheia os arquivos estaticos
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalando...');
  
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => {
        console.log('[Service Worker] Cacheando arquivos estaticos');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        console.log('[Service Worker] Instalacao concluida');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[Service Worker] Erro na instalacao:', error);
      })
  );
});

// Evento de ativacao - limpa caches antigos
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Ativando...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_VERSION) {
              console.log('[Service Worker] Removendo cache antigo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[Service Worker] Ativacao concluida');
        return self.clients.claim();
      })
  );
});

// Evento de fetch - estrategia: Cache First, fallback para Network
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Nao cachear chamadas para a API externa
  if (url.origin !== location.origin) {
    // Para APIs externas, sempre buscar da rede
    event.respondWith(fetch(event.request));
    return;
  }
  
  // Para recursos locais, tentar cache primeiro
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          console.log('[Service Worker] Servindo do cache:', event.request.url);
          return cachedResponse;
        }
        
        console.log('[Service Worker] Buscando da rede:', event.request.url);
        return fetch(event.request)
          .then((response) => {
            // Verifica se recebeu uma resposta valida
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clona a resposta
            const responseToCache = response.clone();
            
            // Adiciona ao cache
            caches.open(CACHE_VERSION)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch((error) => {
            console.error('[Service Worker] Erro ao buscar:', error);
            // Aqui poderia retornar uma pagina offline customizada
            throw error;
          });
      })
  );
});
