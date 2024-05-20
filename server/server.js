const dotenv = require('dotenv')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const mysql = require('mysql2')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, "public")))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// MySQL connection
const connection = mysql.createConnection(process.env.JAWSDB_URL)

connection.connect(error => {
  if (error) {
    console.error('Database connection failed:', error)
    return
  }
  console.log('Connected to the MySQL server.')
})

app.use(express.static(path.join(__dirname, '../client/build')))

// // Подключение к базе данных MySQL
// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// })

// // Проверка подключения к базе данных
// connection.connect((err) => {
//   if (err) {
//     console.error('Database connection error: ', err)
//   }
// })

app.get('/api/events', (req, res) => {
    connection.query('SELECT * FROM events', (err, results) => {
    if (err) {
        console.error('DB query error: ', err)
        res.status(500).send('Server error')
    } else {
        res.json(results)
    }
    })
})
app.get('/api/view/:event_id', (req, res) => {
    const event_id = req.params.event_id
    const qr = "SELECT e.title, p.full_name, p.email FROM participants as p LEFT JOIN events as e ON e.id = p.event_id WHERE p.event_id = ?"
    connection.query(qr, [event_id], (err, results) => {
        if (err) {
            console.error('DB query error: ', err)
            res.status(500).send('Server error')
        } else {
            res.json(results)
        }
    })
})
app.post('/api/register', (req, res) => {
    const { fullName, email, birthDate, hearFrom, event_id } = req.body
    let hearFromValue = ''

    switch (hearFrom) {
        case 'SM':
            hearFromValue = 'Social media'
            break
        case 'FR':
            hearFromValue = 'Friends'
            break
        case 'FM':
            hearFromValue = 'From myself'
            break
        default:
            hearFromValue = null
    }

    if (!hearFromValue) {
        return res.status(400).send('Invalid value for "Where did you hear about this event?"')
    }

    const query = 'INSERT INTO participants (full_name, email, bdate, hear_from, event_id) VALUES (?, ?, ?, ?, ?)'
    connection.query(query, [fullName, email, birthDate, hearFromValue, event_id], (err, results) => {
        if (err) {
            console.error('DB insertion error: ', err)
            res.status(500).send('Server error')
        } else {
            res.status(200).send('Registration successful')
        }
    })
})

// All other GET requests not handled before will return the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
  })

// Слушаем указанный порт
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})