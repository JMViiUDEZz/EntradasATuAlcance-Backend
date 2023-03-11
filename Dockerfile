FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:prod"]

# Base image
FROM nginx:1.21-alpine

# Copy default config
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80
