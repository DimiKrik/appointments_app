import '../../Styles/AppointmentForm.css';
import { useEffect, useState } from 'react';
import axios from '../../axios/axios';

const TechnicianFormEdit = (props) => {
  const [firstName, setName] = useState(props.technician.firstName);
  const [lastName, setSurname] = useState(props.technician.lastName);
  const [email, setEmail] = useState(props.technician.email);
  const [telephone, setTelephone] = useState(props.technician.telephone);
  const [password, setPassword] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    const newTechnician = {
      firstName,
      lastName,
      email,
      telephone,
      password,
    };
    try {
      const response = await axios.put(
        `/users/${props.technician._id}`,
        newTechnician
      );
      console.log('Technician added successfully:', response.data);
      props.handleShowForm(false);
      props.updateAppointment(true, 'updated');
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
        <h2>Update technician</h2>
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
        <label>Password</label>
        <input
          type='password'
          name='password'
          id='password'
          autoComplete='off'
          placeholder="**********"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <div className='form-buttons'>
          <button onClick={handleUpdate} id='submit-button'>
            Update technician
          </button>
          <button onClick={handleShowForm}>Cancel</button>
        </div>
      </form>
    </div>
  );
};
export default TechnicianFormEdit;
