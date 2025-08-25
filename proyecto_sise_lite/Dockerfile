# Usar Node.js oficial
FROM node:20-alpine

# Crear directorio de la app
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Construir la app (Next.js)
RUN npm run build

# Exponer el puerto donde correrá la app
EXPOSE 3000

# Comando para iniciar
CMD ["npm", "start"]
