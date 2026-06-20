// Service worker mínimo de NovaTrade.
// Su único propósito es cumplir el requisito del navegador para
// permitir "Instalar app" / añadir a pantalla de inicio.
// No cachea nada de forma agresiva: simplemente deja pasar las
// peticiones a la red, así que el bot de Coze sigue funcionando con
// datos en vivo sin servir contenido viejo desde caché.

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
