const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
// app.use(express.json());
app.use(bodyParser.json());

// Подключение к базе данных MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysqlroot',
  database: 'eventapp'
});

// Проверка подключения к базе данных
connection.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных: ', err);
  } else {
    console.log('Подключение к базе данных успешно!');
  }
});

app.get('/api/events', (req, res) => {
    connection.query('SELECT * FROM events', (err, results) => {
      if (err) {
        console.error('Ошибка запроса к базе данных: ', err);
        res.status(500).send('Ошибка сервера');
      } else {
        res.json(results);
      }
    });
  });

  app.post('/api/register', (req, res) => {
    const { fullName, email, birthDate, hearFrom, event_id } = req.body;
    let hearFromValue = '';
  
    switch (hearFrom) {
      case 'SM':
        hearFromValue = 'Social media';
        break;
      case 'FR':
        hearFromValue = 'Friends';
        break;
      case 'FM':
        hearFromValue = 'From myself';
        break;
      default:
        hearFromValue = null;
    }
  
    if (!hearFromValue) {
      return res.status(400).send('Invalid value for "Where did you hear about this event?"');
    }
  
    const query = 'INSERT INTO participants (full_name, email, bdate, hear_from, event_id) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [fullName, email, birthDate, hearFromValue, event_id], (err, results) => {
      if (err) {
        console.error('Ошибка при вставке данных: ', err);
        res.status(500).send('Ошибка сервера');
      } else {
        res.status(200).send('Registration successful');
      }
    });
  });
// Слушаем указанный порт
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});