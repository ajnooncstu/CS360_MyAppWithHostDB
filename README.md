# MyAppWithHostDB - Node.js with MySQL Database in the Docker Host Example

## Overview
This project demonstrates how to connect a Node.js application running in a Docker container to a MySQL database hosted on the local machine. The application uses the Express framework and performs CRUD operations on a MySQL database.

## Prerequisites
Make sure you have the following installed:
- MySQL Server
- Node.js
- Docker

## Setup Instructions

### 1. MySQL Database Setup
- Install MySQL on your host machine if it's not already installed.
- Log in to MySQL:
  ```bash
  mysql -u root -p
  ```
- Run the commands in the init.sql file to create the database and table:
  ```sql
  source init.sql;
  ```

### 2. Build and Run the Docker Container
- Build the docker image named my-node-app-with-host-db from the dockerfile
```bash
docker build -t my-node-app-with-host-db .
```
- Run the docker container
```bash
docker run -d --name web-server -p 3000:3000 my-node-app-with-host-db
```

### 3. Access the Application
- To fetch all users:
```bash
curl http://localhost:3000/users
```
- To fetch a user by ID:
```bash
curl http://localhost:3000/users/1
```
