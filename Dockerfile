FROM node:24-alpine

# Entorno de la chamba
WORKDIR /home/app

# Copia el archivo package.json
COPY package*.json .

# Instala las dependencias
RUN npm install

# Copia el archivo . a /home/app
COPY . /home/app/

# Documentacion
EXPOSE 3000 

USER node

CMD ["npm", "start"]