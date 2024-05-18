import React from 'react'
import { format } from 'date-fns'

const EventCard = ({ event }) => {
  const formattedDate = format(new Date(event.event_date), 'dd MMM yyyy, HH:mm')

  return (
    <div className="card h-100">
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title">{event.title}</h5>
          <p className="card-text">{event.description}</p>
          <p className="card-text">{event.organizer}</p>
          <p className="card-text">
            <small className="text-muted">{formattedDate}</small>
          </p>
        </div>
        <div className="d-flex justify-content-between mt-3">
          <a href={`/register/${event.id}`} className="btn btn-primary">Register</a>
          <a href={`/view/${event.id}`} className="btn btn-secondary">View</a>
        </div>
      </div>
    </div>
  )
}

export default EventCard