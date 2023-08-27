import '../Styles/TechnicianForm.css';
import { useEffect, useState } from 'react';

const TechnicianForm = (props) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
        <h2>Add new technician</h2>
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
          type='text'
          name='password'
          id='password'
          autoComplete='off'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          disabled
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
export default TechnicianForm;
