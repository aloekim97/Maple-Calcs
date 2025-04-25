// public/sw.js
const CACHE_NAME = 'app-cache-v1';
const JSON_DATA_URL = '/data.json';
const SETS = '/sets.json';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll([JSON_DATA_URL]))
      .then((cache) => cache.addAll([SETS]))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('fetch', (event) => {
  // Cache-first strategy for JSON data
  if (event.request.url.includes(JSON_DATA_URL)) {// public/sw.js
    const CACHE_NAME = 'app-cache-v2'; // Version bump for updates
    const CACHE_ASSETS = [
      '/data.json',
      '/sets.json'
    ];
    
    self.addEventListener('install', (event) => {
      event.waitUntil(
        caches.open(CACHE_NAME)
          .then(cache => {
            // Check what's already cached
            return cache.keys().then(existingRequests => {
              const existingUrls = new Set(existingRequests.map(req => req.url));
              const toCache = CACHE_ASSETS.filter(url => !existingUrls.has(new URL(url, self.location.origin).href));
              
              if (toCache.length > 0) {
                return cache.addAll(toCache);
              }
              return Promise.resolve();
            });
          })
          .then(() => self.skipWaiting())
          .catch(err => {
            console.error('ServiceWorker installation failed:', err);
          })
      );
    });
    
    self.addEventListener('fetch', (event) => {
      const requestUrl = new URL(event.request.url);
      
      // Only handle GET requests for our JSON data
      if (event.request.method !== 'GET') return;
      
      // Cache-first strategy for JSON data with network fallback
      if (CACHE_ASSETS.some(url => requestUrl.pathname === url)) {
        event.respondWith(
          caches.match(event.request)
            .then(cached => {
              // Return cached if exists, otherwise fetch and cache
              return cached || fetch(event.request)
                .then(response => {
                  // Only cache valid responses
                  if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                  }
                  
                  // Clone the response for caching
                  const responseToCache = response.clone();
                  caches.open(CACHE_NAME)
                    .then(cache => cache.put(event.request, responseToCache))
                    .catch(err => console.error('Cache put failed:', err));
                  
                  return response;
                })
                .catch(err => {
                  console.error('Fetch failed:', err);
                  // You could return a fallback response here if desired
                  throw err;
                });
            })
        );
        return;
      }
      
      // For non-JSON requests, use network-first strategy
      event.respondWith(
        fetch(event.request)
          .catch(() => {
            // Network failed, check cache
            return caches.match(event.request);
          })
      );
    });
    
    // Clean up old caches
    self.addEventListener('activate', (event) => {
      event.waitUntil(
        caches.keys().then(cacheNames => {
          return Promise.all(
            cacheNames.map(cache => {
              if (cache !== CACHE_NAME) {
                return caches.delete(cache);
              }
            })
          );
        })
      );
    });
    event.respondWith(
      caches
        .match(event.request)
        .then((cached) => cached || fetch(event.request))
    );
    return;
  }
});

