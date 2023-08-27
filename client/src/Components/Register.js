import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../Styles/Register.css';
import doodle from '../Assets/doodle.jpg';
import Register2 from './Register2';

const Register = () => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username !== '' || email !== '' || !password !== '') {
      setStep(2);
    }
  };

  const handlePreviousStep = () => {
    setStep(1);
  };

  return (
    <div className='register-main'>
      <div className='side-doodle'>
        <img src={doodle} alt='doodle' className='doodle' />
      </div>
      <div className='register-form-wrapper'>
        <div className='register-form'>
          <h1>Sign up</h1>
          {step === 1 && (
            <form onSubmit={handleSubmit} className='form'>
              <label>Username</label>
              <input
                type='text'
                id='username'
                autoComplete='off'
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
                placeholder=''
              />
              <label>Email</label>
              <input
                type='email'
                id='email'
                autoComplete='off'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                placeholder=''
              />
              <label>Password</label>
              <input
                type='password'
                id='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                placeholder=''
              />
              <Link to='/login'>Already have an account? Sign in.</Link>
              <button type='submit'>Next</button>
            </form>
          )}
          {step === 2 && (
            <Register2
              username={username}
              email={email}
              password={password}
              onPrevious={handlePreviousStep}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
