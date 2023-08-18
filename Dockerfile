FROM node:18-alpine
WORKDIR /app

COPY ./package.json ./package.json
COPY ./client ./client
COPY ./server ./server
RUN mkdir ./uploads
COPY ./.env ./.env

EXPOSE 5000
RUN ["npm", "install"]
RUN cd ./client
RUN ["npm", "install"]
RUN cd ..
RUN ["npm", "run", "build"]
CMD ["npm", "start"]
