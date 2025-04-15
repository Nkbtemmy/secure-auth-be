# Development stage
FROM node:23 AS development

ENV NODE_ENV=development
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
RUN yarn install --frozen-lockfile --ignore-scripts
RUN yarn global add typescript @types/node ts-node prisma
COPY . .
RUN npx prisma generate
RUN yarn build
RUN ls -la /app/node_modules/.prisma
# Compile prisma
RUN npx tsc prisma/seed.ts

# Production stage
FROM node:22-alpine3.20 AS production
RUN apk add --no-cache tini
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN yarn install --production --ignore-scripts --prefer-offline --frozen-lockfile
COPY --from=development /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=development /app/node_modules/ts-node ./node_modules/ts-node
COPY --from=development /app/build ./build
COPY --from=development /app/prisma ./prisma

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["yarn", "start"]
