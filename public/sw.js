/* eslint-disable no-restricted-globals */
self.addEventListener("fetch", event => {
  if (
    event.request.url.endsWith(".jpg") ||
    event.request.url.endsWith(".jpeg") ||
    event.request.url.endsWith(".gif") ||
    event.request.url.endsWith(".png")
  ) {
    event.respondWith(
      fetch(`/image/nointernet.gif`).then(response => response)
    );
  }

  caches.open("name-cache").then(cache => {
    var fileName = "/image/nointernet.gif";
    fetch(fileName).then(response => {
      cache.put(fileName, response.clone());
    });
  });
});
