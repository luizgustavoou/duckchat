FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

ARG REACT_APP_API_BASE_URL
ENV VITE_REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

EXPOSE 5173

CMD ["npm", "run", "dev"]