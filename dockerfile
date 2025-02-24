bashCopy code
FROM node:22
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . . 
# ENV PORT 8080
EXPOSE 3060
CMD ["node ", "server"]