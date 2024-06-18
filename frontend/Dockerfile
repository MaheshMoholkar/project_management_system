# Use the official Node.js image as a base
FROM node:20

# Create and set the working directory
WORKDIR /usr/src/frontend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite app
RUN npx tsc
RUN npx vite build

# Install a lightweight web server
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Command to serve the application
CMD ["serve", "-s", "dist"]
