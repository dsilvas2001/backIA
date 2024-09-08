# Usa una imagen base oficial de Node.js
FROM node:lts-alpine

# Configura el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json (o yarn.lock)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código fuente al contenedor
COPY . .

# Compila el código TypeScript a JavaScript
RUN npm run build

# Expone el puerto en el que la aplicación estará escuchando
EXPOSE 3001

# Define el comando para iniciar la aplicación
CMD [ "node", "dist/app.js" ]
