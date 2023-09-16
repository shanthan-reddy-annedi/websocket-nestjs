# Use a Node.js base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

ENV POSTGRES_HOST=127.0.0.1
ENV POSTGRES_PORT=5432
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=83355806
ENV POSTGRES_DATABASE=chat

# Expose the port your NestJS application listens on
EXPOSE 3000

# Start the NestJS application
CMD ["npm", "run","start"]
