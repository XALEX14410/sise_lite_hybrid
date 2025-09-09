#Define la imagen base sobre la cual se creará la imagen.
FROM node:18

#Establece el directorio de trabajo dentro del contenedor.
WORKDIR /app

#Copiar estos archivos primero, aprovecha el caché del Docker.
COPY package*.json ./

#Instala las dependencias del proyecto.
RUN npm install

#Copia los archivos y directorios al contenedor.
COPY . .

#Describe los puertos en donde la aplicación estará escuchando.
EXPOSE 4000


CMD ["node", "server.js"]