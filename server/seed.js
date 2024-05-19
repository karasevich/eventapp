require('dotenv').config()
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

const events = [
  {
    title: 'Event qwe',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam interdum accumsan accumsan. Aenean rhoncus odio sed quam pulvinar, at scelerisque mi dictum. Quisque nunc elit, venenatis vitae',
    event_date: '2024-05-20 10:00:00',
    organizer: 'Organizer 1'
  },
  {
    title: 'Event rty',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam interdum accumsan accumsan. Aenean rhoncus odio sed quam pulvinar, at scelerisque mi dictum. Quisque nunc elit, venenatis vitae',
    event_date: '2024-06-15 14:00:00',
    organizer: 'Organizer 2'
  },
  {
    title: 'Event uio',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam interdum accumsan accumsan. Aenean rhoncus odio sed quam pulvinar, at scelerisque mi dictum. Quisque nunc elit, venenatis vitae',
    event_date: '2024-07-10 18:00:00',
    organizer: 'Organizer 3'
  },
  {
    title: 'Event poi',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam interdum accumsan accumsan. Aenean rhoncus odio sed quam pulvinar, at scelerisque mi dictum. Quisque nunc elit, venenatis vitae',
    event_date: '2024-07-12 18:00:00',
    organizer: 'Organizer 4'
  },
  {
    title: 'Event uyt',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam interdum accumsan accumsan. Aenean rhoncus odio sed quam pulvinar, at scelerisque mi dictum. Quisque nunc elit, venenatis vitae',
    event_date: '2024-07-13 18:00:00',
    organizer: 'Organizer 5'
  },
  {
    title: 'Event rew',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam interdum accumsan accumsan. Aenean rhoncus odio sed quam pulvinar, at scelerisque mi dictum. Quisque nunc elit, venenatis vitae',
    event_date: '2024-07-14 18:00:00',
    organizer: 'Organizer 6'
  },
  {
    title: 'Event ewq',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam interdum accumsan accumsan. Aenean rhoncus odio sed quam pulvinar, at scelerisque mi dictum. Quisque nunc elit, venenatis vitae',
    event_date: '2024-07-15 18:00:00',
    organizer: 'Organizer 7'
  },
  {
    title: 'Event asd',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam interdum accumsan accumsan. Aenean rhoncus odio sed quam pulvinar, at scelerisque mi dictum. Quisque nunc elit, venenatis vitae',
    event_date: '2024-07-16 18:00:00',
    organizer: 'Organizer 8'
  },
  {
    title: 'Event sdf',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam interdum accumsan accumsan. Aenean rhoncus odio sed quam pulvinar, at scelerisque mi dictum. Quisque nunc elit, venenatis vitae',
    event_date: '2024-07-17 18:00:00',
    organizer: 'Organizer 9'
  },
  {
    title: 'Event dfg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam interdum accumsan accumsan. Aenean rhoncus odio sed quam pulvinar, at scelerisque mi dictum. Quisque nunc elit, venenatis vitae',
    event_date: '2024-07-18 18:00:00',
    organizer: 'Organizer 10'
  },
  {
    title: 'Event fgh',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam interdum accumsan accumsan. Aenean rhoncus odio sed quam pulvinar, at scelerisque mi dictum. Quisque nunc elit, venenatis vitae',
    event_date: '2024-07-19 18:00:00',
    organizer: 'Organizer 11'
  },
  {
    title: 'Event ghj',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam interdum accumsan accumsan. Aenean rhoncus odio sed quam pulvinar, at scelerisque mi dictum. Quisque nunc elit, venenatis vitae',
    event_date: '2024-07-21 18:00:00',
    organizer: 'Organizer 12'
  },
  {
    title: 'Event hjk',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam interdum accumsan accumsan. Aenean rhoncus odio sed quam pulvinar, at scelerisque mi dictum. Quisque nunc elit, venenatis vitae',
    event_date: '2024-07-22 18:00:00',
    organizer: 'Organizer 10'
  },
  {
    title: 'Event jkl',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam interdum accumsan accumsan. Aenean rhoncus odio sed quam pulvinar, at scelerisque mi dictum. Quisque nunc elit, venenatis vitae',
    event_date: '2024-07-23 18:00:00',
    organizer: 'Organizer 11'
  },
  {
    title: 'Event klk',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam interdum accumsan accumsan. Aenean rhoncus odio sed quam pulvinar, at scelerisque mi dictum. Quisque nunc elit, venenatis vitae',
    event_date: '2024-07-24 18:00:00',
    organizer: 'Organizer 9'
  },
  {
    title: 'Event zxc',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam interdum accumsan accumsan. Aenean rhoncus odio sed quam pulvinar, at scelerisque mi dictum. Quisque nunc elit, venenatis vitae',
    event_date: '2024-07-25 18:00:00',
    organizer: 'Organizer 10'
  },
  {
    title: 'Event xcv',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam interdum accumsan accumsan. Aenean rhoncus odio sed quam pulvinar, at scelerisque mi dictum. Quisque nunc elit, venenatis vitae',
    event_date: '2024-07-26 18:00:00',
    organizer: 'Organizer 11'
  },
]

connection.connect((err) => {
  if (err) {
    console.error('Database connection error: ', err)
    return
  }

  // Очистка таблицы перед заполнением
  connection.query('DELETE FROM events', (err, result) => {
    if (err) {
      console.error('Table clearing error: ', err)
      return
    }

    console.log('Table events cleared')

    // Вставка данных
    events.forEach((event) => {
      const { title, description, event_date, organizer } = event
      connection.query(
        'INSERT INTO events (title, description, event_date, organizer) VALUES (?, ?, ?, ?)',
        [title, description, event_date, organizer],
        (err, result) => {
          if (err) {
            console.error('DB insertion error: ', err)
            return
          }

          console.log('Data inserted: ', result.insertId)
        }
      )
    })

    // Закрытие соединения
    connection.end((err) => {
      if (err) {
        console.error('Connection closing error: ', err)
        return
      }

      console.log('Connection closed')
    })
  })
})