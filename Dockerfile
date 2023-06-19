# Use the official Nginx base image
FROM nginx:latest

# Copy static files to the Nginx document root directory
COPY static /usr/share/nginx/html/static
COPY react/dist /usr/share/nginx/html/react

RUN ls -la /usr/share/nginx/html

# Configure Nginx to use PHP
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
