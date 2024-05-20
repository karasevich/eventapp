# eventapp
This guide will walk you through the process of setting up a full-stack web application using Node.js, Express.js, React, and MySQL. Additionally, it will cover setting up environment variables using a .env file for accessing the database.

Prerequisites
Node.js and npm installed on your machine
MySQL database server installed and running

Steps
# 1. Clone the Repository
```shell
git clone https://github.com/karasevich/eventapp.git
```
# 2. Navigate to the Project Directory
```shell
cd your-repository
```
# 3. Install Dependencies

## Install server dependencies
```shell
cd server
npm install
```
## Navigate to the client directory and install client dependencies
```shell
cd client
npm install
```
# 4. Configure Environment Variables
Create a .env file in the root/server directory of your project.
Add the following environment variables to the .env file:

DB_HOST=your_database_host <br>
DB_USER=your_database_user<br>
DB_PASSWORD=your_database_password<br>
DB_NAME=eventapp<br>

# 5. Set Up the Database
Make sure your MySQL database server is running.
Create a new MySQL database for your application.

# Create a new MySQL database for your application.
```shell
node migrate.js
node seed.js
```

# 6. Start the server and client concurrently in development mode
```shell
npm run dev
```
# 7. Accessing the Application
Your application should now be running. You can access the client at http://localhost:3000.
The server will be running at http://localhost:5000.
Additional Notes
Ensure that your MySQL server is properly configured and accessible.
Customize the application according to your project requirements.
For production deployment, make sure to configure environment variables securely and set up appropriate database permissions.