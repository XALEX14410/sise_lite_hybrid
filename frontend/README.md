# 🚀 Tutorial Docker para Next.js en Windows

Guía completa para **Dockerizar un proyecto Next.js** en Windows, compatible también con proyectos **React (JSX)**. Incluye dos modos: **Desarrollo (hot-reload)** y **Producción (build + start)**, con instrucciones claras para aplicar cambios.

---

## ✅ Prerrequisitos

- **Docker Desktop** instalado y corriendo (`docker version`)
- **Node.js 18+** (solo si quieres correr fuera de Docker)
- Carpeta de trabajo: `C:\Users\jesal\tu-proyecto`

---

## 0️⃣ (Opcional) Crear el proyecto Next.js

```bash
cd C:\Users\jesal
npx create-next-app@latest tu-proyecto
cd tu-proyecto
```

---

## 1️⃣ Archivos esenciales para Docker

### 📦 `Dockerfile` (producción)

Crea `C:\Users\jesal\tu-proyecto\Dockerfile`:

```dockerfile
# Etapa 1: build
FROM node:18-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa 2: imagen final (producción)
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm","run","start"]
```

---

### 🛑 `.dockerignore`

Crea `C:\Users\jesal\tu-proyecto\.dockerignore`:

```
node_modules
.next
.git
.gitignore
Dockerfile
docker-compose.yml
npm-debug.log
```

---

### 🐳 `docker-compose.yml` (desarrollo con hot-reload)

Crea `C:\Users\jesal\tu-proyecto\docker-compose.yml`:

```yaml
version: "3.9"
services:
    web:
        image: node:18-alpine
        container_name: nextapp-dev
        working_dir: /app
        ports:
            - "3000:3000"
        volumes:
            - .:/app
            - /app/node_modules
        environment:
            NEXT_TELEMETRY_DISABLED: "1"
            CHOKIDAR_USEPOLLING: "true"
            WATCHPACK_POLLING: "true"
        command: sh -c "npm install && npm run dev"
```

---

## 2️⃣ Modo Desarrollo (hot-reload)

### 🔥 Levantar entorno

```bash
cd C:\Users\jesal\tu-proyecto
docker compose up -d
```
Accede a: [http://localhost:3000](http://localhost:3000)

---

### ✏️ Aplicar cambios

- Edita archivos en la carpeta del proyecto.
- **Hot-reload** debe reflejar los cambios al guardar.
- Si no refresca:

    ```bash
    docker compose restart web
    ```

---

### 📝 Logs y diagnóstico

```bash
docker compose logs -f web
docker exec -it nextapp-dev sh
ls -la /app
```

---

### 🛑 Apagar entorno

```bash
docker compose down
```

> **Nota:** En desarrollo, **NO** uses `docker build`; el código se monta con `volumes`.

---

## 3️⃣ Modo Producción (build + start)

### 🏗️ Build y arranque inicial

```bash
cd C:\Users\jesal\tu-proyecto
docker build -t proyecto-next .
docker run -d --name nextapp -p 3000:3000 proyecto-next
```
Accede a: [http://localhost:3000](http://localhost:3000)

---

### ♻️ Aplicar cambios en producción

Siempre **reconstruye y recrea** el contenedor:

```bash
docker stop nextapp && docker rm nextapp
docker build -t proyecto-next .
docker run -d --name nextapp -p 3000:3000 proyecto-next
```

> Si sospechas de caché:

```bash
docker stop nextapp && docker rm nextapp
docker build --no-cache -t proyecto-next .
docker run -d --name nextapp -p 3000:3000 proyecto-next
```

---

### 📋 Logs y estado

```bash
docker logs -f nextapp
docker ps -a
```

---

### 🧹 Parar y borrar contenedor

```bash
docker stop nextapp
docker rm nextapp
```

---

## 4️⃣ Limpieza y utilidades

### 🗑️ Borrar contenedores

```bash
docker stop web 2>$null
docker rm web 2>$null
docker stop nextapp 2>$null
docker rm nextapp 2>$null
```

---

### 🖼️ Borrar imágenes de prueba

```bash
docker rmi proyecto-next ejemplo-next nginx
# o forzado:
docker rmi -f proyecto-next ejemplo-next nginx
```

---

### 🧹 Limpieza general (¡cuidado!)

```bash
docker system prune -a
```

---

### ⚡ Puerto ocupado

```bash
# ver quién usa 3000
netstat -ano | findstr :3000
# matar proceso por PID (ejemplo)
taskkill /PID 1234 /F
```

---

## 5️⃣ Resumen rápido (copypaste)

### Desarrollo (hot-reload)

```bash
cd C:\Users\jesal\tu-proyecto
docker compose up -d
# editar archivos y refrescar
# si no refleja:
docker compose restart web
# apagar:
docker compose down
```

---

### Producción (cada cambio requiere rebuild)

```bash
cd C:\Users\jesal\tu-proyecto
docker stop nextapp && docker rm nextapp
docker build -t proyecto-next .
docker run -d --name nextapp -p 3000:3000 proyecto-next
```

---

Con este flujo tienes: **dev** para trabajar rápido con recarga en vivo, y **prod** para releases estables. Si te interesa, puedo agregar cómo servir Next.js detrás de Nginx como reverse proxy.

