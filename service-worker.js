// Install event - caching important files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('number-system-converter-v1').then((cache) => {
      return cache.addAll([
        '/',               // root page
        '/index.html',     // HTML page
        '/style.css',      // CSS stylesheet
        '/mainJs.js'       // JavaScript file
      ]);
    })
  );
});

// Fetch event - serving cached files when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // If there's a cached match, return it, otherwise fetch from network
      return response || fetch(event.request);
    })
  );
});
