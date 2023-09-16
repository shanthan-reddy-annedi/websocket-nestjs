# Use a Node.js base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./
COPY yarn.lock ./

# Install application dependencies
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Expose the port your NestJS application listens on
EXPOSE 3000

# Start the NestJS application
CMD ["npm", "run","start"]
