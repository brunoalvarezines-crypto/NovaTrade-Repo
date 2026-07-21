/* Service worker de Gastos — offline + instalación.
   Estrategia: la página (HTML) va network-first para recibir actualizaciones;
   los iconos y estáticos van cache-first. Las llamadas a otros dominios
   (Supabase, CDNs) NO se tocan: pasan directas a la red. */

var CACHE = "gastos-v1";
var ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",
  "./favicon-32.png"
];

self.addEventListener("install", function(e){
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(ASSETS).catch(function(){}); }));
});

self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function(e){
  var req = e.request;
  if (req.method !== "GET") return;

  var url;
  try { url = new URL(req.url); } catch (err) { return; }

  // Solo gestionamos peticiones del mismo origen (la propia app).
  // Supabase, fuentes y CDNs pasan a la red sin intervención.
  if (url.origin !== self.location.origin) return;

  var isHTML = req.mode === "navigate" ||
    (req.headers.get("accept") || "").indexOf("text/html") !== -1;

  if (isHTML) {
    // network-first, con caché de respaldo
    e.respondWith(
      fetch(req).then(function(r){
        var copy = r.clone();
        caches.open(CACHE).then(function(c){ c.put(req, copy); });
        return r;
      }).catch(function(){
        return caches.match(req).then(function(m){ return m || caches.match("./index.html"); });
      })
    );
    return;
  }

  // cache-first para el resto de estáticos del mismo origen
  e.respondWith(
    caches.match(req).then(function(m){
      return m || fetch(req).then(function(r){
        var copy = r.clone();
        caches.open(CACHE).then(function(c){ c.put(req, copy); });
        return r;
      });
    })
  );
});
