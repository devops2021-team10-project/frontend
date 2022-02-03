#stage 1
FROM node:16-buster as node
WORKDIR /usr/src/app
# Install deps
COPY ./package.json ./package.json
RUN npm install
# Copy code
COPY ./ ./
RUN npm install
RUN npm run build


#stage 2
FROM nginx:alpine
COPY --from=node /usr/src/app/dist/frontend /usr/share/nginx/html
