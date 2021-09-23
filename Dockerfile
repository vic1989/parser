FROM node:12.18.1
WORKDIR app
COPY ["backend/package.json", "backend/package-lock.json*", "./backend/"]
COPY ["parser/package.json", "parser/package-lock.json*", "./parser/"]
COPY ["frontend/client/package.json", "frontend/client/package-lock.json*", "./frontend/client/"]

RUN cd backend && npm install
RUN cd parser && npm install
RUN cd frontend/client && npm install
COPY . .
CMD ["npm", "start"]

#RUN cd frontend/client && yarn start