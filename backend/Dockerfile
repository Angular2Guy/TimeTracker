FROM node:24-alpine
WORKDIR /app
ENV PORT=8088
COPY package*.json ./
RUN npm install --omit=dev
COPY dist/ .
CMD ["node", "main.js"]