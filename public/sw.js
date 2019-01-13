/* eslint-disable no-restricted-globals */

self.addEventListener("install", () => {
  caches.open("app").then(cache => {
    cache.addAll(["./"]);
  });
});

self.addEventListener("fetch", event => {
  //   if (
  //     event.request.url.endsWith(".jpg") ||
  //     event.request.url.endsWith(".jpeg") ||
  //     event.request.url.endsWith(".gif") ||
  //     event.request.url.endsWith(".png")
  //   ) {
  //     event.respondWith(
  //       fetch(`/image/nointernet.gif`).then(response => response)
  //     );
  //   }

  event.respondWith(caches.open("app").then(cache => cache.match("./")));
});
