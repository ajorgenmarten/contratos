FROM node:22-alpine AS BUILD

WORKDIR /home/node/app

COPY pnpm-lock.yaml package.json pnpm-workspace.yaml .

RUN corepack enable pnpm

RUN pnpm install --frozen-lockfile --ignore-scripts

COPY . .

RUN pnpm exec prisma generate

RUN pnpm build

FROM node:22-alpine AS DEVELOPMENT

WORKDIR /home/node/app

COPY --from=BUILD /home/node/app/generated .

COPY --from=BUILD /home/node/app/dist .

COPY --from=BUILD /home/node/app/prisma .

COPY pnpm-lock.yaml package.json pnpm-workspace.yaml .

RUN corepack enable pnpm

RUN pnpm install --frozen-lockfile --prod

CMD [ "node", "src/main.js" ]
