# Development stage
FROM node:23 AS development

ENV NODE_ENV=development
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
RUN npm install
RUN npm install -g typescript @types/node ts-node prisma nodemon bcryptjs
COPY . .
RUN npx prisma generate
RUN npm run build
# Compile prisma
CMD ["npm", "run", "dev"]

