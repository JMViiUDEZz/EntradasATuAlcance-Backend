# Imagen base de Node
FROM node:14-alpine

# Directorio de trabajo en el contenedor
WORKDIR /app

# Copiar archivo package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias de la aplicación
RUN npm install

# Copiar la aplicación al contenedor
COPY . .

# Construir la aplicación
RUN npm run build

# Exponer el puerto 3000
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:prod"]
