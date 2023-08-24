# Prueba de Backend | Culqui

Esto es una guía para poder correr el proyecto.

### Prerequisitos

- Se debe tener Redis corriendo localmente, para ello se usará Docker, por ello debemos descargar la imagen a través de la terminal: **docker pull redis**
- Para ver mejor los datos que se guarda dentro de Redis, usaremos redis-commander, para instalarlo globalmente, se debe correr: **sudo npm install -g redis-commander**

## Ejecutar el proyecto

- Dentro del proyecto instalamos las dependencias: **npm i**
- Inicializamos el contenedor de docker que tiene la imagen de Redis: **docker run -d --name redis-stack-server -p 6379:6379 redis/redis-stack-server:latest**
- Una vez iniciada la base de datos corremos : **redis-commander**, esto abrirá un puerto donde podrás ver los datos visualmente.
- Dentro del proyecto ejecutamos **npm start** con ello se levantará el proyecto y podrá probar la API.

## Ejecutar test

- No se cuenta.
