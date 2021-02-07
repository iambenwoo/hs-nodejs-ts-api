FROM node:12

# Create app directory
WORKDIR /usr/src/app

ENV NODE_ENV dev

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /usr/src/app

RUN yarn install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . /usr/src/app

RUN yarn tsc

EXPOSE 8081

CMD [ "yarn", "start:dev" ]
