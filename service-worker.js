// Simple offline-first service worker for Power Chart
const CACHE_NAME = 'power-chart-v1';
const OFFLINE_URLS = [
  './',
  './index.html',
  './Quiz.html',
  './Results.html',
  './Data.html',
  './Profiles.html',
  './manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(OFFLINE_URLS);
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => k !== CACHE_NAME ? caches.delete(k) : Promise.resolve()));
    self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    try {
      const fresh = await fetch(request);
      // Optionally cache GET requests
      if (request.method === 'GET' && fresh && fresh.status === 200) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, fresh.clone());
      }
      return fresh;
    } catch (err) {
      // On network error, try cache fallback for navigations
      if (request.mode === 'navigate') {
        const cache = await caches.open(CACHE_NAME);
        return (await cache.match('./index.html')) || Response.error();
      }
      throw err;
    }
  })());
});