# Usa una imagen base de Node.js
FROM node:16.17.0

RUN mkdir -p /usr/src/app


# Crea un directorio de trabajo
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json (o yarn.lock)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Compila el código TypeScript
RUN npm run build

# Exponer el puerto en el que la app estará escuchando
EXPOSE 3001

# Ejecuta el archivo de entrada
CMD ["npm","start"]