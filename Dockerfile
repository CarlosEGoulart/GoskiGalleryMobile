# Use an official Node.js runtime as a parent image
FROM node:20-slim

# Set the working directory to /app
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install any needed packages
RUN yarn install

# Bundle app source
COPY . .

# Build the app
RUN yarn build

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variable
ENV PORT 3000

# Run the app when the container launches
CMD ["yarn", "serve"]
