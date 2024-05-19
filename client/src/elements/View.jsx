import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'

function View() {
    const { id } = useParams()
    const [participants, setParticipants] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        const fetchParticipants = async () => {
        try {
            const response = await axios.get(`/api/view/${id}`)
            setParticipants(response.data)
            setSearchResults(response.data)
        } catch (error) {
            console.error('DB fetching error:', error)
        }
    }

    fetchParticipants()
    }, [id])

    const handleSearch = (e) => {
        const query = e.target.value
        setSearchQuery(query)
        const filteredParticipants = participants.filter((participant) => {
            return (
                participant.full_name.toLowerCase().includes(query.toLowerCase()) ||
                participant.email.toLowerCase().includes(query.toLowerCase())
            )
        })
        setSearchResults(filteredParticipants)
    }
    // Проверка наличия данных
    if (!participants || participants.length === 0) {
      return (
        <div className="container mt-5">
          <h2>No participants found for this event.</h2>
          <div className="mt-3">
            <Link to="/" className="btn btn-primary">Back to Events</Link>
          </div>
        </div>
      )
    }

    return (
    <div className="container mt-5">
      {participants.length > 0 ? (
        <h2>"{participants[0].title}" participants</h2>
      ) : (
        <h2>Loading participants...</h2>
      )}
      <div className="mb-3">
        <input
            type="text"
            className="form-control"
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={handleSearch}
        />
      </div>
      {searchResults.length === 0 ? (
        <p>No participants found.</p>
      ) : (
        <div className="row">
        {searchResults.map((participant, index) => (
            <div key={index} className="col-md-3 mb-4">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{participant.full_name}</h5>
                        <p className="card-text">{participant.email}</p>
                    </div>
                </div>
            </div>
        ))}
        </div>
      )}
      <div className="mt-3">
        <Link to="/" className="btn btn-primary">Back to Events</Link>
      </div>
    </div>
    )
}

export default View