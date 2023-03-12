FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
RUN npm run build
CMD ["node", "index.js"]
# CMD ["npm", "run", "start:dev"]
