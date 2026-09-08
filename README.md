# Marta — experiencia web

Regalo digital: una experiencia narrativa de scroll, construida a medida
sobre la historia real de vuestra relación. No es una plantilla: cada
escena, texto y transición está escrito para esto específicamente.

## Estructura del proyecto

```
/frontend      React + TypeScript + Vite + Tailwind + GSAP (la experiencia)
/backend       Java + Spring Boot (opcional, ver más abajo)
render.yaml    Blueprint de despliegue en Render
```

La experiencia **funciona por completo con solo el frontend**. El
backend no es necesario para que Marta vea la web: está ahí,
limpio y preparado, por si en el futuro quieres ampliar el proyecto
(por ejemplo, servir el contenido desde una API en vez de tenerlo
embebido en el cliente). No tiene base de datos ni login.

---

## 1. Antes de nada: la canción

Por derechos de autor, el archivo de audio no se incluye en el
proyecto. Debes colocar tú el mp3 (con los derechos correspondientes)
en:

```
frontend/public/audio/heartbreaker.mp3
```

Si el archivo no existe, la web sigue funcionando igual: el
reproductor simplemente no sonará hasta que lo añadas.

---

## 2. Contenido editable

Todo el texto de la historia (nombres, fechas, la carta, los textos
de cada escena) vive en un único archivo, para que puedas editarlo
sin tocar ningún componente:

```
frontend/src/content/relationship.ts
```

---

## 3. Ejecutar en local (frontend)

Requisitos: Node.js 20+.

```bash
cd frontend
npm install
npm run dev
```

Abre `http://localhost:5173`.

### Compilar para producción

```bash
cd frontend
npm run build
```

Esto genera `frontend/dist`, listo para servirse como sitio estático.
Puedes previsualizar el build de producción con:

```bash
npm run preview
```

---

## 4. Ejecutar en local (backend, opcional)

Requisitos: Java 21 y Maven.

```bash
cd backend
mvn spring-boot:run
```

Por defecto arranca en `http://localhost:8080`. Expone:

- `GET /api/relationship` — el mismo contenido que ya tiene el
  frontend embebido, disponible como JSON por si algún día quieres
  consumirlo desde ahí en vez de duplicarlo.
- `GET /actuator/health` — comprobación de estado.

> Nota: en el entorno donde se generó este proyecto no había acceso
> de red a Maven Central, así que el backend no se pudo compilar de
> extremo a extremo en ese momento. El código sigue la estructura
> estándar de un proyecto Spring Boot 3 (generado a mano siguiendo
> exactamente el esqueleto que produciría start.spring.io), pero te
> recomendamos ejecutar `mvn clean verify` la primera vez que lo
> abras en tu máquina para confirmar que todo compila en tu entorno.

---

## 5. Desplegar en Render

### Opción A — usando el Blueprint (`render.yaml`)

1. Sube este proyecto a un repositorio de GitHub.
2. En Render, elige **New > Blueprint** y selecciona el repositorio.
3. Render leerá `render.yaml` y creará automáticamente:
   - `marta-experience-frontend` (Static Site) — esta es la URL que
     le vas a enviar a Marta.
   - `marta-experience-backend` (Web Service, opcional) — puedes
     eliminarlo del blueprint si no lo quieres desplegar.
4. Despliega. En unos minutos tendrás una URL tipo
   `https://marta-experience-frontend.onrender.com`.

### Opción B — manual (solo frontend, lo mínimo necesario)

1. En Render: **New > Static Site**.
2. Conecta el repositorio y configura:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
3. Añade una regla de rewrite `/* -> /index.html` (necesaria porque
   es una SPA de una sola página).
4. Despliega.

### Variables de entorno relevantes

- `CORS_ALLOWED_ORIGIN` (backend): dominio del frontend en
  producción, para que las peticiones a `/api/relationship` no sean
  bloqueadas por CORS. Si no despliegas el backend, ignora esto.

---

## 6. Antes de enviarle la URL a Marta

- Revisa en un móvil real que el scroll y las animaciones van fluidas.
- Confirma que el audio se activa correctamente al pulsar "Entrar".
- Relee la carta (`relationship.ts`) una última vez.
- La URL de Render es pública pero no está indexada ni enlazada desde
  ningún sitio (no hay login porque no se pidió, pero tampoco hace
  falta: solo tú compartes el enlace).

---

## 7. Stack técnico

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, GSAP +
  ScrollTrigger, canvas 2D para las partículas ambientales.
- **Backend**: Java 21, Spring Boot 3.3, sin base de datos, sin
  autenticación.
- **Animaciones**: orquestadas por escena, con `prefers-reduced-motion`
  respetado y densidad de partículas adaptada a dispositivos de gama
  baja.
