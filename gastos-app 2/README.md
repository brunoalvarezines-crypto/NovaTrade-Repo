# Gastos

App de gestión de gastos con sincronización en la nube (Firebase) e **instalable en el móvil** (se añade a la pantalla de inicio y se abre como una app, con su icono). Los mismos datos en el móvil y en el ordenador, en tiempo real.

## Archivos (súbelos todos al repositorio)

- `index.html` — la aplicación.
- `manifest.webmanifest` — datos de la app para poder instalarla.
- `sw.js` — service worker (funciona sin conexión + instalación).
- `icon-192.png`, `icon-512.png`, `icon-512-maskable.png`, `apple-touch-icon.png`, `favicon-32.png` — el icono en varios tamaños.
- `logo.png` — el logo plano en PNG transparente (por si lo quieres aparte).
- `firestore-rules.txt` — las reglas de seguridad de la base de datos.
- `README.md` — esta guía.

> Para instalarse, la app tiene que abrirse desde la URL de **GitHub Pages** (https), no desde un archivo local.

---

## Puesta en marcha (una sola vez, ~10 min)

### 1) Crear el proyecto en Firebase (gratis)

1. Entra en https://console.firebase.google.com con tu cuenta de Google.
2. **Add project / Crear proyecto**, ponle un nombre. Puedes **desactivar Google Analytics** para simplificar. Crea el proyecto.

### 2) Registrar la app web y copiar la configuración

1. En la página del proyecto, pulsa el icono **web `</>`** ("Add app" → Web).
2. Ponle un apodo cualquiera y registra la app (no hace falta Hosting).
3. Firebase te muestra un bloque `firebaseConfig` con `apiKey`, `authDomain`, `projectId`, etc. Déjalo a mano para el paso 5.

### 3) Activar el acceso (Authentication)

1. Menú lateral → **Build → Authentication → Get started**.
2. En **Sign-in method**, activa **Email/Password** y guarda.

### 4) Crear la base de datos (Firestore) y sus reglas

1. Menú lateral → **Build → Firestore Database → Create database**.
2. Elige una ubicación y créala (puedes empezar en modo producción).
3. Abre la pestaña **Rules / Reglas**, borra lo que haya, pega el contenido de `firestore-rules.txt` y pulsa **Publish / Publicar**.

### 5) Poner tu configuración en la app

Abre `index.html` con un editor de texto y, cerca del principio del `<script>`, rellena estos valores con los de tu `firebaseConfig`:

```js
var FIREBASE_CONFIG = {
  apiKey: "AIza...",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  appId: "1:1234567890:web:abc123"
};
```

> Estos datos están pensados para ir en el navegador: son seguros de publicar. La seguridad la dan el login y las reglas de Firestore, no ocultar la config.

Si lo dejas vacío, la app funciona igualmente pero solo en local (sin sincronizar).

### 6) Subir a la web con GitHub Pages

1. En https://github.com crea un repositorio nuevo (por ejemplo `gastos`), **público**.
2. **Add file → Upload files** y sube **todos los archivos** de la lista de arriba (arrástralos juntos). **Commit changes**.
3. **Settings → Pages** → *Deploy from a branch* → rama `main`, carpeta `/ (root)` → **Save**.
4. Espera 1–2 minutos: tendrás una URL tipo `https://TU-USUARIO.github.io/gastos/`.

### 7) Entrar y usar

Abre esa URL en el móvil y en el ordenador. La primera vez pulsa **Crear cuenta** (con tu correo y una contraseña), y a partir de ahí entra con **Entrar**. Verás los mismos datos en ambos, sincronizados al instante.

---

## Instalar la app en el móvil (icono en la pantalla de inicio)

Abre la URL de GitHub Pages en el navegador del móvil y:

**iPhone / iPad (Safari):** botón *Compartir* → **Añadir a pantalla de inicio** → *Añadir*.

**Android (Chrome):** menú de tres puntos → **Instalar aplicación** (o *Añadir a pantalla de inicio*).

Después, ábrela desde su icono: se comporta como una app normal.

---

## Notas

- El indicador de la cabecera muestra el estado: *Sincronizando…*, *Sincronizado* o *Sin conexión*.
- La pestaña secreta (transacciones) se abre desde la calculadora con el código **5292**.
- Si cambias algún archivo, vuelve a subirlo a GitHub. La app se actualiza sola la próxima vez que la abras.
