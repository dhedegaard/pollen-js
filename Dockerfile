FROM node:20-alpine
LABEL maintainer="Dennis Hedegaard"

WORKDIR /app
EXPOSE 3000

# Install dependencies.
COPY package.json package-lock.json ./
RUN npm ci

# Build the app.
COPY . ./
RUN npm run build

# Run the app.
ENV NODE_ENV=production
CMD [ "npm", "start" ]
