# Imagen base
FROM node:18-alpine

# Crea la carpeta de la aplicación
WORKDIR /app

# Copia el package.json y el package-lock.json a la imagen
COPY package*.json ./

# Instala las dependencias
RUN npm install --only=production

# Copia los archivos de la aplicación a la imagen
COPY ./dist ./dist

# Exponer el puerto que usará la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD [ "node", "dist/main" ]
