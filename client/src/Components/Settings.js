import '../Styles/AppointmentForm.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axios/axios';

const Settings = (props) => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    telephone: '',
    password: '',
  });

  const storedUserId = localStorage.getItem('userId');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUserData = {};

    for (const key in userData) {
      if (userData[key].trim() !== '') {
        updatedUserData[key] = userData[key];
      }
    }

    try {
      await axios.put(`/users/${storedUserId}`, updatedUserData);
      console.log('User profile updated.');

    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <div>
      <div className='appointments-wrapper'>
        <h1 className='half-width-border'>Settings</h1>
        <form onSubmit={handleSubmit} className='appointment-form settings'>
          <h2>Edit Profile</h2>
          <label htmlFor='firstName'>First Name:</label>
          <input
            type='text'
            id='firstName'
            name='firstName'
            placeholder={props.firstName}
            value={userData.firstName}
            onChange={handleInputChange}
          />
          <label htmlFor='lastName'>Last Name:</label>
          <input
            type='text'
            id='lastName'
            name='lastName'
            placeholder={props.lastName}
            value={userData.lastName}
            onChange={handleInputChange}
          />
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder={props.email}
            value={userData.email}
            onChange={handleInputChange}
          />
          <label htmlFor='telephone'>Telephone:</label>
          <input
            type='text'
            id='telephone'
            name='telephone'
            placeholder={props.telephone}
            value={userData.telephone}
            onChange={handleInputChange}
          />
          <label htmlFor='address'>Address:</label>
          <input
            type='text'
            id='address'
            name='address'
            placeholder={props.address}
            value={userData.address}
            onChange={handleInputChange}
          />
          <label htmlFor='address'>Password:</label>
          <input
            type='password'
            id='passwrod'
            name='password'
            placeholder="**********"
            value={userData.password}
            onChange={handleInputChange}
          />
          <button type='submit'>Update Profile</button>
        </form>
      </div>
    </div>
  );
};
export default Settings;
