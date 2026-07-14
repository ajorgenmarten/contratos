#!/bin/sh

pnpm exec prisma migrate deploy

node dist/src/main.js
