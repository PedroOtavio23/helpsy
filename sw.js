// Cache simples para o Helpsy abrir mesmo sem internet.
const CACHE = "helpsy-v4";
const FILES = [
  "./", "./index.html", "./admin.html", "./data.js", "./manifest.webmanifest",
  "./assets/marca-verde.png", "./assets/marca-branca.png", "./assets/logo-verde.png", "./assets/logo-branco.png",
  "./assets/favicon.png", "./assets/icon-192.png", "./assets/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  // Página: tenta a rede primeiro (para pegar atualizações); imagens: cache primeiro.
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).then((res) => { caches.open(CACHE).then((c) => c.put("./index.html", res.clone())); return res; })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }
  event.respondWith(caches.match(req).then((hit) => hit || fetch(req)));
});
