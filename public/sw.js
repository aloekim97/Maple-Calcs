// public/sw.js
const CACHE_NAME = 'gear-cache-v1'; // Updated cache version
const PRECACHE_ASSETS = [
  '/data.json', // Precached files
];
const IMAGE_CACHE_NAME = 'image-cache-v1'; // Separate cache for images

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      console.log('Precaching core assets');

      // Cache each asset with individual error handling
      await Promise.all(
        PRECACHE_ASSETS.map((asset) =>
          cache
            .add(asset)
            .catch((err) => console.error('Failed to cache', asset, err))
        )
      );

      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Clean up old caches
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((cacheName) => {
          if (![CACHE_NAME, IMAGE_CACHE_NAME].includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Handle image requests
  if (url.pathname.startsWith('/image/')) {
    event.respondWith(
      (async () => {
        try {
          // Try cache first
          const cached = await caches.match(event.request, {
            cacheName: IMAGE_CACHE_NAME,
          });
          if (cached) {
            console.log('Serving image from cache:', url.pathname);
            return cached;
          }

          // Fallback to network
          const response = await fetch(event.request);

          // Cache successful responses
          if (response.ok) {
            const cache = await caches.open(IMAGE_CACHE_NAME);
            console.log('Caching new image:', url.pathname);
            await cache.put(event.request, response.clone());
          }

          return response;
        } catch (error) {
          console.error('Image fetch failed:', error);
          // Return fallback image
          return caches.match('/image/items/fallback.png');
        }
      })()
    );
    return;
  }

  // Handle data.json specifically
  if (url.pathname === '/data.json') {
    event.respondWith(
      (async () => {
        // Try cache first
        const cached = await caches.match(event.request);
        if (cached) return cached;

        // Fallback to network
        const response = await fetch(event.request);
        if (response.ok) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(event.request, response.clone());
        }
        return response;
      })()
    );
    return;
  }

  // For all other requests, use network first
  event.respondWith(fetch(event.request));
});
