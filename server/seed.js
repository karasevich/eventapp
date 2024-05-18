const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysqlroot',
  database: 'eventapp'
});

const events = [
  {
    title: 'Event 1',
    description: 'Lorem ipsum....',
    event_date: '2024-05-20 10:00:00',
    organizer: 'Organizer 1'
  },
  {
    title: 'Event 2',
    description: 'Lorem ipsum....',
    event_date: '2024-06-15 14:00:00',
    organizer: 'Organizer 2'
  },
  {
    title: 'Event 3',
    description: 'Lorem ipsum....',
    event_date: '2024-07-10 18:00:00',
    organizer: 'Organizer 3'
  },
  {
    title: 'Event 4',
    description: 'Lorem ipsum....',
    event_date: '2024-07-12 18:00:00',
    organizer: 'Organizer 4'
  },
  {
    title: 'Event 5',
    description: 'Lorem ipsum....',
    event_date: '2024-07-13 18:00:00',
    organizer: 'Organizer 5'
  },
  {
    title: 'Event 6',
    description: 'Lorem ipsum....',
    event_date: '2024-07-14 18:00:00',
    organizer: 'Organizer 6'
  },
  {
    title: 'Event 7',
    description: 'Lorem ipsum....',
    event_date: '2024-07-15 18:00:00',
    organizer: 'Organizer 7'
  },
  {
    title: 'Event 8',
    description: 'Lorem ipsum....',
    event_date: '2024-07-16 18:00:00',
    organizer: 'Organizer 8'
  },
  {
    title: 'Event 9',
    description: 'Lorem ipsum....',
    event_date: '2024-07-17 18:00:00',
    organizer: 'Organizer 9'
  },
  {
    title: 'Event 10',
    description: 'Lorem ipsum....',
    event_date: '2024-07-18 18:00:00',
    organizer: 'Organizer 10'
  },
  {
    title: 'Event 11',
    description: 'Lorem ipsum....',
    event_date: '2024-07-19 18:00:00',
    organizer: 'Organizer 11'
  },
];

connection.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных: ', err);
    return;
  }

  console.log('Подключение к базе данных успешно!');

  // Очистка таблицы перед заполнением
  connection.query('DELETE FROM events', (err, result) => {
    if (err) {
      console.error('Ошибка очистки таблицы: ', err);
      return;
    }

    console.log('Таблица events очищена');

    // Вставка данных
    events.forEach((event) => {
      const { title, description, event_date, organizer } = event;
      connection.query(
        'INSERT INTO events (title, description, event_date, organizer) VALUES (?, ?, ?, ?)',
        [title, description, event_date, organizer],
        (err, result) => {
          if (err) {
            console.error('Ошибка вставки данных: ', err);
            return;
          }

          console.log('Данные вставлены: ', result.insertId);
        }
      );
    });

    // Закрытие соединения
    connection.end((err) => {
      if (err) {
        console.error('Ошибка закрытия соединения: ', err);
        return;
      }

      console.log('Соединение закрыто');
    });
  });
});