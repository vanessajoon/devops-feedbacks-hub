# Using the official lightweight Nginx image
FROM nginx:alpine

# Remove the default Nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy your custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy your HTML, CSS, and JS files into Nginx's public directory
COPY . /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]