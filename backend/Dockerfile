# Use the official Node.js image as a base
FROM node:20

# Create and set the working directory
WORKDIR /usr/src/backend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npx tsc

# Expose the port the app runs on
EXPOSE 8001

# Command to run the application
CMD ["node", "dist/index.js"]
