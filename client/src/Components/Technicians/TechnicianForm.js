import '../../Styles/AppointmentForm.css';
import { useEffect, useState } from 'react';
import axios from '../../axios/axios';

const TechnicianForm = (props) => {
  const [firstName, setName] = useState('');
  const [lastName, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTechnician = {
      firstName,
      lastName,
      email,
      telephone,
      username,
      password,
      isTechnician: true,
      isClient: false,
    };

    try {
      const response = await axios.post('/auth/register', newTechnician);
      console.log('Technician added successfully:', response.data);

      props.handleShowForm(false);
      props.fetchUserData(true, 'added');
      props.timer();
    } catch (error) {
      console.error('Error adding technician:', error);
    }
  };

  const handleShowForm = () => {
    props.handleShowForm(false);
  };

  return (
    <div className='appointment-form-wrapper '>
      <form className='appointment-form scale-up-center'>
        <h2>Add new technician</h2>
        <label>Name</label>
        <input
          type='text'
          name='firstName'
          id='firstName'
          autoComplete='off'
          onChange={(e) => setName(e.target.value)}
          value={firstName}
          required
        />
        <label>Surname</label>
        <input
          type='text'
          name='lastName'
          id='lastName'
          autoComplete='off'
          onChange={(e) => setSurname(e.target.value)}
          value={lastName}
          required
        />
        <label>Phone</label>
        <input
          type='phone'
          name='telephone'
          id='telephone'
          autoComplete='off'
          onChange={(e) => setTelephone(e.target.value)}
          value={telephone}
          required
        />
        <label>Email</label>
        <input
          type='email'
          name='email'
          id='email'
          autoComplete='off'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <label>Username</label>
        <input
          type='text'
          name='username'
          id='username'
          autoComplete='off'
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        />
        <label>Password</label>
        <input
          type='password'
          name='password'
          id='password'
          autoComplete='off'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <div className='form-buttons'>
          <button onClick={handleSubmit} id='submit-button'>
            Add technician
          </button>
          <button onClick={handleShowForm}>Cancel</button>
        </div>
      </form>
    </div>
  );
};
export default TechnicianForm;
