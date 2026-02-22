# Use a lightweight Node image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your backend code
COPY . .

# Expose the port your Express server runs on
EXPOSE 5000

# Start the server
CMD ["npm", "start"]