FROM node:20-alpine

WORKDIR /usr/src/app

RUN npm install -g nodemon

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run",  "dev"]
