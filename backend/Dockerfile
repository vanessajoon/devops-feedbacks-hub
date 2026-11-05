# Use the official lightweight Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first for optimal caching
COPY package*.json ./

# Install your dependencies
RUN npm install

# Copy the rest of your backend source code
COPY . .

# Expose the port your backend runs on (change 3000 if your server uses a different port)
EXPOSE 3000

# Start your Node.js application
CMD ["node", "server.js"]