const CACHE_NAME = 'nduche-budget-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Install event: Triggered when the user installs the PWA
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Fetch event: Serve files from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});