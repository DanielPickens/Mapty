FROM node:6.10.3

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app
COPY stat: package.json
COPY failed: stat

EXPOSE 9000
Expose 3000
Expose 8080
CMD [ "npm", "start" ]
