# Use the official MySQL image
FROM mysql:latest

# Set environment variables
ENV MYSQL_DATABASE=Login
ENV MYSQL_ROOT_PASSWORD=Deviljin1
ENV MYSQL_USER=appuser
ENV MYSQL_PASSWORD=Deviljin1

# Add the SQL script
ADD ./db.sql /docker-entrypoint-initdb.d/db.sql
