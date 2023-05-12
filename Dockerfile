FROM node:18.12.1

WORKDIR /src
COPY package*.json ./

RUN npm install


COPY . .

EXPOSE 3000

CMD ["node", "dist/index.js"]