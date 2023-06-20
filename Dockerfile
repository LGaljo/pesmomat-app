# Base image
FROM node:16-alpine as builder

WORKDIR /app

COPY --chown=node:node . .

RUN npm ci

RUN npm run build:prod

RUN rm -rf node_modules && \
  NODE_ENV=production npm ci

FROM node:16-alpine

WORKDIR /app

COPY --from=builder --chown=node:node /app  .

USER node

ARG NODE_ENV=production
ARG HOST=0.0.0.0
ARG PORT=4000
#ARG API_URL=http://localhost:4500

EXPOSE 4000

CMD ["npm", "run", "start:prod"]
