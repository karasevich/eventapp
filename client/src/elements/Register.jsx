import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'

function Register() {
    const { id } = useParams()
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        birthDate: '',
        hearFrom: '',
        event_id: id
    })
    
    const [errors, setErrors] = useState({})
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            event_id: id
        }))
    }, [id])

    const validate = () => {
        let errors = {}

        if (!formData.fullName) {
            errors.fullName = 'Full name is required'
        } else if (formData.fullName.length < 3 || formData.fullName.length > 100) {
            errors.fullName = 'Full name must be between 3 and 100 characters'
        } else if (!/^[a-zA-Z\- ]+$/.test(formData.fullName)) {
            errors.fullName = 'Full name can only contain letters, spaces, and hyphens'
        }

        if (!formData.email) {
            errors.email = 'Email is required'
        } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
            errors.email = 'Invalid email address'
        }

        if (!formData.birthDate) {
            errors.birthDate = 'Birth date is required'
        } else {
            const today = new Date()
            const birthDate = new Date(formData.birthDate)
            const ageDiff = today.getFullYear() - birthDate.getFullYear()
            const isUnderAge = ageDiff < 14 || (ageDiff === 14 && today.getMonth() < birthDate.getMonth())
            if (isUnderAge) {
                errors.birthDate = 'You must be at least 14 years old'
            }
        }

        if (!formData.hearFrom) errors.hearFrom = 'This field is required'

        return errors
    }
    
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        try {
        await axios.post('/api/register', formData)
            setSuccess(true)
            setFormData({
                fullName: '',
                email: '',
                birthDate: '',
                hearFrom: '',
                event_id: id
            })
            setErrors({})
        } catch (error) {
            console.error('post data error:', error)
        }
    }
  return (
    <div className="container mt-5 w-50 p-3">
      <h2>Event registration</h2>
      {success && <div className="alert alert-success">Registration successful!</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group p-2">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
        </div>
        <div className="form-group p-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="form-group p-2">
          <label htmlFor="birthDate">Birth Date</label>
          <input
            type="date"
            className={`form-control ${errors.birthDate ? 'is-invalid' : ''}`}
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
          />
          {errors.birthDate && <div className="invalid-feedback">{errors.birthDate}</div>}
        </div>
        <div className="form-group row p-2">
          <label className="col-sm-12 col-form-label text-center">Where did you hear about this event?</label>
          <div className="col-sm-12 text-center">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="hearFromSM"
                name="hearFrom"
                value="SM"
                checked={formData.hearFrom === 'SM'}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="hearFromSM">Social Media</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="hearFromFR"
                name="hearFrom"
                value="FR"
                checked={formData.hearFrom === 'FR'}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="hearFromFR">Friends</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="hearFromFM"
                name="hearFrom"
                value="FM"
                checked={formData.hearFrom === 'FM'}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="hearFromFM">From Myself</label>
            </div>
            {errors.hearFrom && <div className="text-danger">{errors.hearFrom}</div>}
          </div>
        </div>
        <div className="form-group row p-2">
          <div className="col-sm-12 text-center">
            <Link className='btn btn-link' to='/'>Back</Link>
            <button type="submit" className="btn btn-primary">Register</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Register