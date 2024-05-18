import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Link, useNavigate, useParams} from 'react-router-dom'

function Register() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        birthDate: '',
        hearFrom: '',
        event_id: id
      });
    
      const [errors, setErrors] = useState({});
      const [success, setSuccess] = useState(false);

      useEffect(() => {
        setFormData((prevData) => ({
          ...prevData,
          event_id: id
        }));
      }, [id]);

      const validate = () => {
        let errors = {};
        if (!formData.fullName) errors.fullName = 'Full name is required';
        if (!formData.email) errors.email = 'Email is required';
        if (!formData.birthDate) errors.birthDate = 'Birth date is required';
        if (!formData.hearFrom) errors.hearFrom = 'This field is required';
        return errors;
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }
    
        try {
          await axios.post('/api/register', formData);
          setSuccess(true);
          setFormData({
            fullName: '',
            email: '',
            birthDate: '',
            hearFrom: '',
            event_id: id
          });
          setErrors({});
        } catch (error) {
          console.error('Ошибка при отправке данных:', error);
        }
      };
  return (
    <div className="container mt-5 w-50 p-3">
    <h2>Register for the Event</h2>
    {success && <div className="alert alert-success">Registration successful!</div>}
    <form onSubmit={handleSubmit}>
      <div className="form-group row p-2">
        <label htmlFor="fullName" className="col-sm-3 col-form-label">Full Name</label>
        <div className="col-sm-9">
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
      </div>
      <div className="form-group row p-2">
        <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
        <div className="col-sm-9">
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
      </div>
      <div className="form-group row p-2">
        <label htmlFor="birthDate" className="col-sm-3 col-form-label">Birth Date</label>
        <div className="col-sm-9">
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