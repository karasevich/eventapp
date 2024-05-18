import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(8);
  
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const response = await axios.get('/api/events');
          setEvents(response.data);
        } catch (error) {
          console.error('Ошибка при получении событий: ', error);
        }
      };
  
      fetchEvents();
    }, []);
  // Получаем текущие события
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  // Изменение страницы
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='container-fluid bg-primary vh-100 vw-100'>
        <h3>Events</h3>
        {/* <div className='d-flex justify-content-end'>
            <Link className='btn btn-success' to='/create'>Add Student</Link>
        </div> */}
        <div className="row">
        {currentEvents.map((event) => (
          <div key={event.id} className="col-md-3 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{event.title}</h5>
                <p className="card-text">{event.description}</p>
                <a href={`/register/${event.id}`} className="btn btn-primary">Register</a>
                <a href={`/view/${event.id}`} className="btn btn-secondary ml-2">View</a>
              </div>
            </div>
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
        {/* <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((student)=>{
                        return (<tr>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.age}</td>
                            <td>{student.gender}</td>
                            <td>
                                <Link className='btn mx-2 btn-success' to={`/read/${student.id}`}>Read</Link>
                                <Link className='btn mx-2 btn-success' to={`/edit/${student.id}`}>Edit</Link>
                                <button onClick={()=>handleDelete(student.id)} className='btn mx-2 btn-danger'>Delete</button>
                            </td>
                        </tr>)
                    })
                }
            </tbody>
        </table> */}
    </div>
  )
}

export default Home