FROM node:20.5.1-alpine3.18
WORKDIR /app
COPY . .
RUN npm i -g @nestjs/cli
RUN npm install
RUN npm run build
ENV NODE_ENV=production
CMD ["npm", "run", "start:prod"]
