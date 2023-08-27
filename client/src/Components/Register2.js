import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../Styles/Register.css';
import doodle from '../Assets/doodle.jpg';

import axios from '../axios/axios';

const REGISTER_URL = '/auth/register';

const Register2 = (props) => {
  const [register, setRegister] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [address, setAddress] = useState('');
  const [step, setStep] = useState(2);

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = props.username;
    const email = props.email;
    const password = props.password;
    if (
      username !== '' &&
      email !== '' &&
      password !== '' &&
      firstName !== '' &&
      lastName !== '' &&
      telephone !== '' &&
      address !== ''
    ) {
      axios
        .post(
          REGISTER_URL,
          JSON.stringify({
            username,
            email,
            password,
            firstName,
            lastName,
            telephone,
            address,
          }),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.status === 200) {
            setRegister(true);
          }
        })
        .catch((error) => {
          console.log(error);
          console.log(
            username,
            email,
            password,
            firstName,
            lastName,
            telephone,
            address
          );
        });
    }
  };

  return (
    <>
      {register ? (
        <Navigate to='/dashboard' />
      ) : (
        <div className={`register-main-step ${step === 1 ? 'hidden' : ''}`}>
          <div className='register-form'>
            <form onSubmit={handleSubmit} className='form form-second-step'>
              <div className='name-surname'>
                <div>
                  <label>First name</label>
                  <input
                    type='text'
                    id='firstname'
                    autoComplete='off'
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    required
                    placeholder=''
                  />
                </div>
                <div>
                  <label>Last name</label>
                  <input
                    type='text'
                    id='lastName'
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    required
                    placeholder=''
                  />
                </div>
              </div>
              <label>Phone</label>
              <input
                type='tel'
                id='phone'
                onChange={(e) => setTelephone(e.target.value)}
                value={telephone}
                required
                placeholder='691-1234-567'
              />

              <label>Address</label>
              <input
                type='text'
                id='address'
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                required
                placeholder=''
              />

              <Link to='/login'>Already have an account? Sign in.</Link>
              <div>
                <button type='submit' id='back-btn' onClick={props.onPrevious}>
                  Back
                </button>

                <button type='submit'>Sign up</button>
              </div>
            </form>
          </div>
        </div>
        // </div>
      )}
    </>
  );
};

export default Register2;
