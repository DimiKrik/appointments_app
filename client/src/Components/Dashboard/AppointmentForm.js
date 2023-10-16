import React, { useEffect, useState } from 'react';
import axios from '../../axios/axios';

const AppointmentForm = (props) => {
  const [app_date, setDate] = useState('');
  const [pref_time, setTime] = useState('');
  const [type, setType] = useState('');
  const [selectedTechnician, setSelectedTechnician] = useState('');
  const [selectedService, setSelectedService] = useState(''); 
  const [services, setServices] = useState([]);

  const storedUserId = localStorage.getItem('userId');

  useEffect(() => {
    axios
      .get('/services') 
      .then((response) => {
        const servicesData = response.data;
        setServices(servicesData);
      })
      .catch((error) => {
        console.error('Error fetching services', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAppointment = {
      app_date,
      pref_time,
      user_id: storedUserId,
      type,
      service_id: selectedService,
    };

    try {
      const response = await axios.post('/appointments/', newAppointment);
      console.log('Appointment added successfully:', response.data);

      props.handleShowForm(false);
    } catch (error) {
      console.error('Error adding Appointment', error);
    }
  };

  const handleShowForm = () => {
    props.handleShowForm(false);
  };

  return (
    <div className='appointment-form-wrapper'>
      <form className='appointment-form scale-up-center'>
        <h2>Book a new appointment</h2>
        <label>Preferred date</label>
        <input
          type='date'
          name='app_date'
          id='app_date'
          autoComplete='off'
          onChange={(e) => setDate(e.target.value)}
          value={app_date}
          required
        />
        <label>Preferred time</label>
        <input
          type='time'
          name='pref_time'
          id='pref_time'
          autoComplete='off'
          onChange={(e) => setTime(e.target.value)}
          value={pref_time}
          required
        />
        
        <label>Select service</label>
        <select
          name='service_id'
          id='service_id'
          onChange={(e) => setSelectedService(e.target.value)}
          value={selectedService}
          required
        >
          <option value=''>Select service</option>
          {services.map((service) => (
            <option key={service._id} value={service._id}>
              {service.name}
            </option>
          ))}
        </select>

        <div className='form-buttons'>
          <button onClick={handleSubmit} id='submit-button'>
            Book appointment
          </button>
          <button onClick={handleShowForm}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
