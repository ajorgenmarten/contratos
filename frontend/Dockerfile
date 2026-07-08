FROM node:22-alpine AS BUILD

WORKDIR /home/node/app

ARG VITE_BACKEND_URL

ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

RUN corepack enable pnpm

COPY package.json pnpm-lock.yaml .

RUN pnpm install --frozen-lockfile --ignore-scripts

COPY . .

RUN pnpm build:ignore

FROM nginx:alpine AS DEVELOPMENT

COPY --from=BUILD /home/node/app/dist /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
