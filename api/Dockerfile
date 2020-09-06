# Build server side
FROM node:13.12.0-alpine as builder
WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install
COPY . /app
RUN npm run build

# Run server side
FROM node:13.12.0-alpine
WORKDIR /app
COPY --from=builder /app/dist /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install --only=prod
EXPOSE 8080 
CMD ["node", "src/index.js"]