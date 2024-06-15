# Using a more appropriate Node.js base image if Alpine was intended
FROM node:16-alpine

# Declaring the environment
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /express-docker

# Installing dependencies, optimizing layer caching
COPY package*.json ./
RUN npm install

# Copying the application files
COPY . .

# Copying and setting permissions for wait-for-it script
COPY wait-for-it.sh /usr/wait-for-it.sh
RUN chmod +x /usr/wait-for-it.sh

# Exposing the correct server port
EXPOSE 4000

# Starting the application
CMD ["npm", "start"]
