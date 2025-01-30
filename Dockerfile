# Utilizar una imagen base de Node.js
FROM node:16-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar los archivos package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código al contenedor
COPY . .

# Iniciar la aplicación (sin build si es backend)
CMD ["npm", "start"]

# Exponer el puerto
EXPOSE 3006
