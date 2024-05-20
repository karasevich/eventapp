const mysql = require('mysql2')
const fs = require('fs')
const path = require('path')
require('dotenv').config()


const sqlScript = fs.readFileSync(path.join(__dirname, 'migration.sql'), 'utf-8')


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  multipleStatements: true 
})


connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack)
    return
  }
  console.log('Connected to MySQL as id ' + connection.threadId)


  connection.query(sqlScript, (error, results) => {
    if (error) {
      console.error('Error executing migration script:', error.stack)
      return
    }
    console.log('Database and tables created successfully!')
    connection.end()
  })
})