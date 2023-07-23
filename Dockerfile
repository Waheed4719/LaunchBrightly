FROM node:16-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
ENV WATCHPACK_POLLING=TRUE
CMD ["npm", "run", "serve"] 
