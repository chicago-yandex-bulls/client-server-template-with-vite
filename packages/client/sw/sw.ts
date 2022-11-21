/// <reference path="./common.d.ts"  />

const CHECK_ONLINE_STATUS_PARAM: TCheckOnlineParam = 'check-online';

const VERSION = '0.0.3';

const STATIC_CACHE_NAME = 'static-chicago-app-v-' + VERSION;
const DYNAMIC_CACHE_NAME = 'dynamic-chicago-app-v-' + VERSION;

const INDEX_HTML_PATH = 'index.html';

const ASSET_URLS = [INDEX_HTML_PATH];

const SW = self;

SW.addEventListener('install', async event => {
  console.log('[SW]: install');

  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then(cache => {
      cache.addAll(ASSET_URLS);
    })
  );
});

SW.addEventListener('activate', async () => {
  console.log('[SW]: activate');

  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames
      .filter(cacheName => cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME)
      .map(cacheName => caches.delete(cacheName))
  );
});

SW.addEventListener('fetch', async event => {
  const { request } = event;

  const url = new URL(request.clone().url);

  const isCheckOnlineParam = url.searchParams.get(CHECK_ONLINE_STATUS_PARAM);

  if (isCheckOnlineParam) {
    event.respondWith(fetch(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});

async function networkFirst(request: Request) {
  const fetchRequest = await request.clone();
  const cache = await caches.open(DYNAMIC_CACHE_NAME);

  try {
    const response = await fetch(fetchRequest);
    await cache.put(request, response.clone());

    return response;
  } catch (e) {
    const cached = await caches.match(request);

    if (cached) {
      return cached;
    }

    const cache = await caches.open(STATIC_CACHE_NAME);

    return await cache.match(INDEX_HTML_PATH);
  }
}
