// Eguchi Lab — Service Worker
// Network-first for the app shell (cache = offline fallback); cache-on-fetch for fonts, Tone.js, and Salamander samples

const CACHE_VERSION = 'eguchi-lab-v21';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
];

// Cross-origin hosts cached on first fetch
const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];
const CDN_HOSTS = ['unpkg.com', 'tonejs.github.io'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

function cacheOnFetch(event) {
  event.respondWith(
    caches.open(CACHE_VERSION).then((cache) =>
      cache.match(event.request).then((cached) => {
        const fetchPromise = fetch(event.request).then((response) => {
          if (response && response.status === 200) {
            cache.put(event.request, response.clone());
          }
          return response;
        }).catch(() => cached);
        return cached || fetchPromise;
      })
    )
  );
}

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Fonts: cache on fetch, offline fallback
  if (FONT_HOSTS.includes(url.hostname)) {
    cacheOnFetch(event);
    return;
  }

  // Tone.js + Salamander piano samples: cache on fetch, offline fallback
  if (CDN_HOSTS.includes(url.hostname)) {
    cacheOnFetch(event);
    return;
  }

  // App (mesma origem): rede primeiro, para cada deploy aparecer na hora;
  // o cache só entra quando estiver offline.
  if (event.request.method === 'GET' && url.origin === location.origin) {
    event.respondWith(
      fetch(event.request).then((response) => {
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, responseClone));
        }
        return response;
      }).catch(() => caches.match(event.request).then((cached) => cached || caches.match('./index.html')))
    );
  }
});
