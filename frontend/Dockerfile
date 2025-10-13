# Etapa de build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Construir la app de Next.js
RUN npm run build

# Etapa de producción
FROM node:20-alpine

WORKDIR /app

# Copiar solo lo necesario desde la etapa de build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Exponer puerto
EXPOSE 3000

# Iniciar la app en modo producción
CMD ["npm", "start"]
