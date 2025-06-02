const CACHE_VERSION = "v1";
const CACHE_NAME = `soundenginecar-${CACHE_VERSION}`;
const ASSETS = [
  "/", // La racine du site (index.html)
  "/index.html",
  "/manifest.webmanifest",
  "/sounds/v8_loop.mp3",
  "/sounds/f1_loop.mp3",
  "/sounds/rally_loop.mp3",
  "/sounds/ev_loop.mp3",
  "/assets/icon-192.png",
  "/assets/icon-512.png"
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});