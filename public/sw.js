// public/sw.js
const CACHE_NAME = 'app-cache-v1';
const JSON_DATA_URL = '/data.json'; 
const FALLBACK_IMAGE = '/favicon.svg';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll([
        JSON_DATA_URL,
        FALLBACK_IMAGE
      ]))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('fetch', (event) => {
  // Cache-first strategy for JSON data
  if (event.request.url.includes(JSON_DATA_URL)) {
    event.respondWith(
      caches.match(event.request)
        .then(cached => cached || fetch(event.request))
    );
    return;
  }

  // Network-first for images (with fallback)
  if (isImageRequest(event.request)) {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(FALLBACK_IMAGE))
    );
  }
});

function isImageRequest(request) {
  return /\.(png|jpe?g|webp|svg|gif)(\?.*)?$/i.test(request.url);
}