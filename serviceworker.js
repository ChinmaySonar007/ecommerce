const CACHE_NAME = "aurum-cache-v1";

// Pre-cache these on install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(["/", "/index.html", "/offline.html"]);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  // Only handle GET requests
  if (event.request.method !== "GET") return;

  // For navigation requests, try network first, then offline page
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match("/offline.html");
        })
    );
    return;
  }

  // For other requests, cache-first strategy
  event.respondWith(
    caches.match(event.request)
      .then((cached) => {
        if (cached) {
          return cached;
        }
        return fetch(event.request)
          .then((response) => {
            // Cache a copy of every successful response
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
            return response;
          });
      })
  );
});
