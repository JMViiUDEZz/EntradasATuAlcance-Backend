FROM node:lts-alpine
ENV NODE_ENV production
WORKDIR /app
ADD . .
RUN npm install --include=dev
RUN chown -R 108:113 /root/.npm
RUN npm run build || :
EXPOSE 4000
ENTRYPOINT ["sh","/app/deploy.sh"]

FROM postgres:14.3
ENV POSTGRES_USER 
ENV POSTGRES_PASSWORD docker
ENV POSTGRES_DB world
docker build -t my-postgres-db ./
docker run -d --name my-postgresdb-container -p 5432:5432 my-postgres-db
ENTRYPOINT ["docker run -d --name my-postgresdb-container -p 5432:5432 my-postgres-db"]
