# Sistema de Gestión de contratos

## Despliegue del backend

### Despliegue del backend en docker

- Descargar la imagen de docker en docker hub: `ajorgenmarten/contracts-backend`.
- Tener corriendo una base de datos PostgresSQL de la versión 16 en adelante.
- Correr el comando `docker run -d --name contracts-backend -p "3000:3000" -e DATABASE_URL={{cadena de conexión para postgressql}} ajorgenmarten/contracts-frontend`.
- Puedes cambiar el puerto del servicio definiendo la variable de entorno.

### Variables de entorno

| Nombre | Requerida | Valor por defecto | Ejemplo |
|--------|-----------|-------------------|---------|
| PORT   | `No`      | 3000              | 8080    |
| DATABASE_URL| `Si` | -                 | postgres://user:password@server:5432/database?schema=public|
| JWT_ACCESS_SECRET| `No`| access-token-secret| Cu4lqu13rc0sa|
| JWT_REFRESH_SECRET| `No`| refresh-token-secret| Cu4lqu13rc0sa|

### Despliegue del backend local

- Descargar o clonar el repositorio de github.
- Ir a la carpeta `backend` e instalar las dependencias `pnpm install --frozen-lockfile`.
- Crear una archivo .env en la raíz de la carpeta `backend` y definir las variables de entorno anteriormente vistas.
- Correr el servicio con `pnpm start:dev`.

### Migraciones

Para correr las migraciones del servicio estas se encuentran en la carpeta `/prisma/migrations`,
se pueden correr con el comando `pnpm exec prisma migrate dev` o pegar los script sql en alguna herramienta de administración de bases de datos como puede ser adminer.

## Despliegue del frontend

### Despliegue del frontend en docker

- Descargar la imagen de docker en docker hub `ajorgenmarten/contracts-frontend`
- Correr el comando `docker run --name contracts-frontend -d -p 8080:80 ajorgenmarten/contracts-frontend`

> *Nota:* La imagen de docker esta construida por defecto con la variable de entorno de VITE_BACKEND_URL=http://10.0.0.3, en caso de querer cambiarla debe construir la imagen del servicio especificando esta variable como build-arg, a continuación se explica.

### Construir la imagen del servicio

- Descargar o clonar el repositorio, ir a la carpeta frontend.
- Ejecutar el comando `docker image build --build-arg VITE_BACKEND_URL={{url del backend}} -t contracts-frontend .`
- Una vez creada, ya puedes correrla como se explica anteriormente

### Despliegue del frontend local

- Descargar o clonar el repositorio de github
- Ir a la carpeta `frontend` e instalar las dependencias `pnpm install --frozen-lockfile`
- Crear una archivo .env en la raíz de la carpeta `frontend` y definir la variables de entorno `VITE_BACKEND_URL`
- Correr el servicio con `pnpm dev`
