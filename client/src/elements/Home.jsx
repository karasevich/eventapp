import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EventCard from './EventCard'

function Home() {
    const [events, setEvents] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [eventsPerPage] = useState(12)
    const [sortCriteria, setSortCriteria] = useState('date')
    const [sortOrder, setSortOrder] = useState('asc')
  
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/api/events')
                setEvents(response.data)
            } catch (error) {
                console.error('Ошибка при получении событий: ', error)
            }
        }

        fetchEvents()
    }, [])

    // Функция для сортировки событий
    const sortEvents = (events, criteria, order) => {
        return events.slice().sort((a, b) => {
            let valueA = a[criteria]
            let valueB = b[criteria]
            
            if (criteria === 'date') {
                valueA = new Date(a[criteria])
                valueB = new Date(b[criteria])
            }
            if (valueA < valueB) return order === 'asc' ? -1 : 1
            if (valueA > valueB) return order === 'asc' ? 1 : -1
            return 0
        })
    }

    // Получаем текущие события
    const indexOfLastEvent = currentPage * eventsPerPage
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage
    const sortedEvents = sortEvents(events, sortCriteria, sortOrder)
    const currentEvents = sortedEvents.slice(indexOfFirstEvent, indexOfLastEvent)

    // Изменение страницы
    const paginate = (pageNumber) => setCurrentPage(pageNumber)


    // Изменение критерия сортировки
    const handleSortChange = (e) => {
        const [criteria, order] = e.target.value.split('-')
        setSortCriteria(criteria)
        setSortOrder(order)
        setCurrentPage(1)
    }



  return (
    <div className='container-fluid vh-100 w-75 mt-3'>
        <div className="d-flex justify-content-between align-items-center">
            <h3>Events</h3>
            <div className="form-group">
                <select className="form-control" value={`${sortCriteria}-${sortOrder}`} onChange={handleSortChange}>
                    <option value="event_date-asc">Sort by Date (earliest first)</option>
                    <option value="event_date-desc">Sort by Date (latest first)</option>
                    <option value="organizer-asc">Sort by Organizer (A to Z)</option>
                    <option value="organizer-desc">Sort by Organizer (Z to A)</option>
                    <option value="title-asc">Sort by Title (A to Z)</option>
                    <option value="title-desc">Sort by Title (Z to A)</option>
                </select>
            </div>
        </div>
        <div className="row mt-3">
            {currentEvents.map((event) => (
            <div key={event.id} className="col-md-3 mb-4">
                <EventCard event={event} />
            </div>
            ))}
        </div>
      <nav>
        <ul className="pagination justify-content-center">
          {Array.from({ length: Math.ceil(events.length / eventsPerPage) }, (_, i) => (
            <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
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