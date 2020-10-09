// On install, cache some stuff
addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('core').then(function (cache) {
      cache.add(new Request('offline.html'));
      return;
    })
  );
});
// listen for requests
addEventListener('fetch', function (event) {
  // Get the request
  var request = event.request;

  // HTML files
  // Network-first
  if (request.headers.get('Accept').includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          return caches.match('offline.html');
        })
    );
  }
});
