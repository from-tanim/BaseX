// Install event - caching important files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('number-system-converter-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/Assets/style.css',
        '/Assets/mainJs.js',
        '/Assets/manifest.json',
        '/Assets/basex-white.png' // Host this locally instead of using GitHub raw URL
      ]);
    })
  );
  self.skipWaiting(); // Activate immediately
});

// Activate event - remove old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['number-system-converter-v1'];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch event - serve from cache if available
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
