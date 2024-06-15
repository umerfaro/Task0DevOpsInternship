FROM node:16-alpine

WORKDIR /app

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json .

RUN npm install

COPY . .


CMD ["npm", "start"]

EXPOSE 3000