const CACHE = 'duru-v1';
const ASSETS = [
  'https://duru-autodetail.pages.dev/',
  'https://duru-autodetail.pages.dev/index.html',
  'https://duru-autodetail.pages.dev/duru-horizontal-lockup.png',
  'https://duru-autodetail.pages.dev/duru-logo-transparent.png',
  'https://duru-autodetail.pages.dev/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});