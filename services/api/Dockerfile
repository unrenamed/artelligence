# Build server side
FROM node:12-alpine as builder
WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm install
COPY . /app
RUN npm run build

# Run server side
FROM node:12-alpine
WORKDIR /app
COPY --from=builder /app/dist /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm install --only=prod
EXPOSE 8080 
USER node
CMD ["node", "src/index.js"]