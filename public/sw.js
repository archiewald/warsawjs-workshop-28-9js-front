/* eslint-disable no-restricted-globals */

const CACHE_NAME = "app";
const VERSION = "14";

self.addEventListener("install", () => {
  caches.open(CACHE_NAME).then(cache => {
    cache.addAll(["./"]);
  });
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.open("storage-" + VERSION).then(cache =>
      cache.match(event.request).then(res => {
        return (
          res ||
          fetch(event.request).then(response => {
            cache.put(event.request, response.clone());
            return response;
          })
        );
      })
    )
  );
});

self.addEventListener("message", event => {
  if (event.data.action === "skipWaiting") {
    self.skipWaiting();
  }
});
