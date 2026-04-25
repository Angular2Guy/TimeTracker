FROM docker pull node:24-alpine 
COPY dist/ .
COPY .env.production .env

CMD ["node", "main.js"]