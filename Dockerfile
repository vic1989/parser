FROM node:12.18.1
WORKDIR app
COPY ["backend/package.json", "backend/package-lock.json*", "./backend/"]
COPY ["parser/package.json", "parser/package-lock.json*", "./parser/"]
RUN npm install
COPY . .
CMD ["npm", "start"]