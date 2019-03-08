FROM node:lts-alpine
LABEL maintainer="Dennis Hedegaard"

WORKDIR /app
EXPOSE 3000

# Install dependencies.
COPY package.json yarn.lock ./
RUN yarn

# Build the app.
COPY . ./
RUN yarn build

# Run the app.
ENV NODE_ENV=production
CMD [ "node", "build/index.js" ]