var actualVersion = "5";

caches.keys().then(function(names) {
  for (let name of names) {
    if (!(name == "storage-" + actualVersion || name == "storage-posts")) {
      caches.delete(name);
    }
  }
});

self.addEventListener("install", function(event) {
  caches.open("storage-" + actualVersion).then(cacheOpened => {
    return cacheOpened.addAll(["/", "/image/nointernet.gif"]);
  });
});

self.addEventListener("fetch", function(event) {
  if (
    event.request.url.endsWith(".jpg") ||
    event.request.url.endsWith(".jpeg") ||
    event.request.url.endsWith(".gif") ||
    event.request.url.endsWith(".png")
  ) {
    event.respondWith(
      caches.open("storage-posts").then(cache =>
        cache.match(event.request).then(res => {
          return (
            res ||
            fetch(event.request)
              .then(response => {
                if (response.status != 200 && response.status != 0) {
                  return caches.match("/image/nointernet.gif");
                }
                return response;
              })
              .catch(() => caches.match("/image/nointernet.gif"))
          );
        })
      )
    );
    return;
  }

  event.respondWith(
    caches.open("storage-" + actualVersion).then(cache =>
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

self.addEventListener("message", function(event) {
  if (event.data.action === "skipWaiting") {
    self.skipWaiting();
  }
});
