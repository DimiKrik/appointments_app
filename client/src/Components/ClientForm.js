import '../Styles/ClientForm.css';
import { useState } from 'react';

const ClientForm = (props) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleShowForm(false);
  };

  const handleShowForm = () => {
    props.handleShowForm(false);
  };

  return (
    <div className='client-form-wrapper '>
      <form className='client-form scale-up-center'>
        <h2>Add new client</h2>
        <label>Name</label>
        <input
          type='text'
          name='name'
          id='name'
          autoComplete='off'
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
        <label>Surname</label>
        <input
          type='text'
          name='surname'
          id='surname'
          autoComplete='off'
          onChange={(e) => setSurname(e.target.value)}
          value={surname}
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
        <div className='form-buttons'>
          <button onClick={handleShowForm}>Cancel</button>
          <button onClick={handleSubmit} id='submit-button'>
            Add client
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientForm;
