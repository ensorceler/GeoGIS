# Use the official Node.js image as the base image
FROM node:lts as build-stage

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npm run build -- --configuration production

# Use the official Nginx image as the base image for serving the application
FROM nginx:alpine

# Copy the built Angular application from the build-stage to the Nginx HTML directory
COPY --from=build-stage /app/dist/electron/browser /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]