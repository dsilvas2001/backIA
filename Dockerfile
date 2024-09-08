# Usa una imagen base de Node.js
FROM node:18

# Crea un directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el código fuente
COPY . .

# Compila el código TypeScript
RUN npm run build

# Expone el puerto en el que la aplicación escuchará
EXPOSE 3000

# Ejecuta la aplicación
CMD ["node", "dist/app.js"]
