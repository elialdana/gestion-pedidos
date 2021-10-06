#CONSTRUCCION DEL PROYECTO
FROM node:14-alpine as build-step
WORKDIR /the/workdir/path
COPY package*.json /app
RUN npm install
COPY . .
RUN npm run build --prod
#INSTALACION DEL SERVIDOR
FROM nginx:1.17.1-alpine
EXPOSE 4200
#COPIAMOS EL CONTENIDO AL SERVIDOR
COPY --from=build-step /app/dist/PokeApp /usr/share/nginx/html
