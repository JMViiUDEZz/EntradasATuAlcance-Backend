FROM node:16 AS install
LABEL stage=install

ARG REPO_GITHUB
ARG NN_PORT
ARG URL_GITHUB
ARG DB_HOST
ARG DB_NAME
ARG DB_USERNAME
ARG DB_PASSWORD
ARG DB_PORT
ARG PORT
ARG HOST_API
ARG JWT_SECRET

ENV NN_PORT=${NN_PORT}
ENV REPO_GITHUB=${REPO_GITHUB}
ENV URL_GITHUB=${URL_GITHUB}
ENV DB_HOST=${DB_HOST}
ENV DB_NAME=${DB_NAME}
ENV DB_USERNAME=${DB_USERNAME}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_PORT=${DB_PORT}
ENV PORT=${PORT}
ENV HOST_API=${HOST_API}
ENV JWT_SECRET=${JWT_SECRET}

WORKDIR /src/install
COPY ./api/package.json .
COPY ./api/yarn.lock .

RUN yarn config set network-timeout 60000
RUN yarn install

FROM node:16 AS compile
LABEL stage=compile

WORKDIR /src/build
COPY --from=install /src/install .
COPY ./api/ .

RUN yarn build
RUN yarn config set network-timeout 60000
RUN yarn install --production=true

FROM nginx:1.19.0-alpine AS deploy

COPY --from=compile /src/build/dist/main.js /usr/share/nginx/html/index.js
COPY --from=compile /src/build/node_modules /usr/share/nginx/html/node_modules

EXPOSE 81
# EXPOSE $NN_PORT

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
