const CACHE_NAME = "finance-app-cache-v1";
const urlsToCache = [
  "/Nduche/",
  "/Nduche/index.html",
  "/Nduche/manifest.json",
  "/Nduche/icons/icon-192.png",
  "/Nduche/icons/icon-512.png",
  "/Nduche/add-expense.html",
  "/Nduche/reports.html",
  "/Nduche/style.css",
  "/Nduche/script.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) return caches.delete(name);
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
