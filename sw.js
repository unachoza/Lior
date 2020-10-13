const staticAssets = ['index.html', 'style.css', 'script.js'];
const OFFLINE_URL = 'offline.html';

self.addEventListener('install', async (event) => {
  const cache = await caches.open('static-cache');
  cache.addAll(staticAssets);
  console.log('this is what is installing', cache, event);
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Enable navigation preload if it's supported.
      // See https://developers.google.com/web/updates/2017/02/navigation-preload
      if ('navigationPreload' in self.registration) {
        await self.registration.navigationPreload.enable();
      }
    })()
  );

  // Tell the active service worker to take control of the page immediately.
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);
  console.log('what is the request', event.reqest);
  console.log('what is the origin', url.origin);
  console.log('what is the location.url', url.location.url);
  if (url.origin === location.url) {
    event.respondWith(cacheFirst(req));
  } else {
    event.respondWith(newtorkFirst(req));
  }
});
async function cacheFirst(req) {
  const cachedResponse = caches.match(req);
  return cachedResponse || fetch(req);
}
async function newtorkFirst(req) {
  const cache = await caches.open('dynamic-cache');

  try {
    const res = await fetch(req);
    cache.put(req, res.clone());
    return res;
  } catch (error) {
    return await cache.match(req);
  }
}
//// other stuff
// self.addEventListener('fetch', (event) => {
//   console.log(event.request);
//   // We only want to call event.respondWith() if this is a navigation request
//   // for an HTML page.
//   if (event.request.mode === 'navigate') {
//     event.respondWith(
//       (async () => {
//         try {
//           // First, try to use the navigation preload response if it's supported.
//           const preloadResponse = await event.preloadResponse;
//           if (preloadResponse) {
//             return preloadResponse;
//           }

//           const networkResponse = await fetch(event.request);
//           return networkResponse;
//         } catch (error) {
//           // catch is only triggered if an exception is thrown, which is likely
//           // due to a network error.
//           // If fetch() returns a valid HTTP response with a response code in
//           // the 4xx or 5xx range, the catch() will NOT be called.
//           console.log('Fetch failed; returning offline page instead.', error);

//           const cache = await caches.open(CACHE_NAME);
//           const cachedResponse = await cache.match(OFFLINE_URL);
//           return cachedResponse;
//         }
//       })()
//     );
//   }

//   // If our if() condition is false, then this fetch handler won't intercept the
//   // request. If there are any other fetch handlers registered, they will get a
//   // chance to call event.respondWith(). If no fetch handlers call
//   // event.respondWith(), the request will be handled by the browser as if there
//   // were no service worker involvement.
// });

// // On install, cache some stuff
// addEventListener('install', function (event) {
//   event.waitUntil(
//     caches.open('core').then(function (cache) {
//       cache.add(new Request('offline.html'));
//       return;
//     })
//   );
// });
// // listen for requests
// addEventListener('fetch', function (event) {
//   // Get the request
//   var request = event.request;
//   console.log('this is the request', request);

//   // HTML files
//   // Network-first
//   if (request.headers.get('Accept').includes('text/html')) {
//     event.respondWith(
//       fetch(request)
//         .then(function (response) {
//           console.log('this is the response', response);
//           return response;
//         })
//         .catch(function (error) {
//           return caches.match('offline.html');
//         })
//     );
//   }
// });
