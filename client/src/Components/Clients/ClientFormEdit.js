import '../../Styles/AppointmentForm.css';
import { useState } from 'react';
import axios from '../../axios/axios';

const ClientForm = (props) => {
  const [firstName, setName] = useState(props.client.firstName);
  const [lastName, setSurname] = useState(props.client.lastName);
  const [email, setEmail] = useState(props.client.email);
  const [telephone, setTelephone] = useState(props.client.telephone);
  const [address, setAddress] = useState(props.client.address);
  const [password, setPassword] = useState("");


  const handleEdit = async (e) => {
    e.preventDefault();
    const updatedData = {
      firstName,
      lastName,
      email,
      telephone,
      address,
      password,
    };

    try {
      const response = await axios.put(
        `/users/${props.client._id}`,
        updatedData
      );
      props.handleShowForm(false);
      props.updateClient(true, 'updated');
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
        <h2>Update client</h2>
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
        <label>Address</label>
        <input
          type='text'
          name='address'
          id='address'
          autoComplete='off'
          onChange={(e) => setAddress(e.target.value)}
          value={address}
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
          <button onClick={handleEdit} id='submit-button'>
            Update client
          </button>
          <button onClick={handleShowForm}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ClientForm;
