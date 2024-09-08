# # Usa una imagen base de Node.js
# FROM node:16.17.0

# RUN mkdir -p /usr/src/app

# # Crea un directorio de trabajo
# WORKDIR /usr/src/app

# # Copia el package.json y package-lock.json (o yarn.lock)
# COPY package*.json ./

# # Instala las dependencias
# RUN npm install

# # Copia el resto del código
# COPY . .

# # Compila el código TypeScript
# RUN npm run build

# # Exponer el puerto en el que la app estará escuchando
# EXPOSE 9000

# # Ejecuta el archivo de entrada
# CMD ["node", "dist/app.js"]


# Etapa de compilación
FROM node:20.15.0-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . . 
RUN npm run build 

# Etapa de producción
FROM node:alpine as production
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
COPY --from=builder /app/dist ./dist

# Configurar entorno de producción
ENV NODE_ENV=production

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD [ "node", "dist/app.js" ]