import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import EventCard from './EventCard'

function Home() {
    const [events, setEvents] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [eventsPerPage] = useState(12)
  
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const response = await axios.get('/api/events')
          setEvents(response.data)
        } catch (error) {
          console.error('Ошибка при получении событий: ', error)
        }
      };
  
      fetchEvents();
    }, []);
  // Получаем текущие события
  const indexOfLastEvent = currentPage * eventsPerPage
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent)

  // Изменение страницы
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className='container-fluid vh-100 w-75'>
        <h3>Events</h3>
        <div className="row">
            {currentEvents.map((event) => (
            <div key={event.id} className="col-md-3 mb-4">
                <EventCard event={event} />
            </div>
            ))}
        </div>
      <nav>
        <ul className="pagination justify-content-center">
          {Array.from({ length: Math.ceil(events.length / eventsPerPage) }, (_, i) => (
            <li key={i + 1} className="page-item">
              <a onClick={() => paginate(i + 1)} href="#!" className="page-link">
                {i + 1}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Home