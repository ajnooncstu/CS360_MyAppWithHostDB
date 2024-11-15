# MyAppWithHostDB - Node.js with MySQL Database in the Docker Host Example

## Overview
This project demonstrates how to connect a Node.js application running in a Docker container to a MySQL database hosted on the local machine (Amazon Linux 2). The application uses the Express framework and performs CRUD operations on a MySQL database.

## Prerequisites
Make sure you have the following installed in Amazon Linux 2 EC2 Instance:
- Git
- Docker

## Setup Instructions

### 1. MySQL Database Setup
- Install MySQL on your host machine if it's not already installed.
  ```bash
  sudo yum update -y
  sudo amazon-linux-extras install epel -y
  sudo wget https://dev.mysql.com/get/mysql80-community-release-el7-5.noarch.rpm
  sudo rpm -ivh mysql80-community-release-el7-5.noarch.rpm
  sudo yum -nogpg install mysql-community-server
  ```
- Start MySQL
  ```bash
  sudo systemctl start mysqld
  sudo systemctl enable mysqld
  ```
- Get the temporary root password
  ```bash
  sudo cat /var/log/mysqld.log |grep "A temporary password"
  ```
- Make MySQL secure installation
  ```bash
  sudo mysql_secure_installation
  ```
  to set a new root password, remove anonymous users, disablow root login remotely and remote test database and its access. Don't forget to reload privilege tables. 
- Log in to MySQL:
  ```bash
  mysql -u root -p
  ```
- Run the commands in the init.sql file to create the database and table:
  ```sql
  source init.sql;
  ```
- Create and configure a new user
  ```sql
  CREATE USER 'your_user_name'@'%' IDENTIFIED BY 'your_password';
  GRANT ALL PRIVILEGES ON my_database.* TO 'your_user_name'@'%';
  FLUSH PRIVILEGES;
  ```

### 2. Build and Run the Docker Container
- Edited the configuration of the database in src/index.js

- Build the docker image named my-node-app-with-host-db from the dockerfile
```bash
docker build -t my-node-app .
```
- Run the docker container
```bash
docker run -d \
  --name your-container-name \
  -p 3000:3000 \
  my-node-app
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
