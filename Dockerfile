# --- Build stage ---
FROM node:20-slim AS build

WORKDIR /usr/src/app

COPY functions/package*.json ./

RUN npm ci

COPY functions/tsconfig.json ./
COPY functions/src ./src

RUN npm run build

# --- Production stage ---
FROM node:20-slim

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package*.json ./

RUN npm ci --omit=dev

COPY --from=build /usr/src/app/lib ./lib

ENV PORT=8080
EXPOSE 8080

USER node

CMD ["node", "lib/index.js"]
