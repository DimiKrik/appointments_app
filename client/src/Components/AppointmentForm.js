import '../Styles/AppointmentForm.css';
import { useState } from 'react';

const AppointmentForm = (props) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleShowForm(false);
  };

  const handleShowForm = () => {
    props.handleShowForm(false);
  };

  return (
    <div className='appointment-form-wrapper '>
      <form className='appointment-form scale-up-center'>
        <h2>Book a new appointment</h2>
        <label>Preferred date</label>
        <input
          type='date'
          name='date'
          id='date'
          autoComplete='off'
          onChange={(e) => setDate(e.target.value)}
          value={date}
          required
        />
        <label>Preferred time</label>
        <input
          type='time'
          name='time'
          id='time'
          autoComplete='off'
          onChange={(e) => setTime(e.target.value)}
          value={time}
          required
        />
        <label>Select type of appointment</label>
        <select
          name='type'
          id='type'
          onChange={(e) => setType(e.target.value)}
          value={type}
          required
        >
          <option value='default'>Select type</option>
          <option value='option 1'>Select type</option>
          <option value='option 2'>Select type</option>
          <option value='option 3'>Select type</option>
        </select>
        <div className='form-buttons'>
          <button onClick={handleShowForm}>Cancel</button>
          <button onClick={handleSubmit} id='submit-button'>
            Book appointment
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
