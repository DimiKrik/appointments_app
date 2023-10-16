import { useState } from 'react';
import '../../Styles/Login.css';
import { Link, Navigate } from 'react-router-dom';
import '../../Styles/Login.css';
import doodle from '../../Assets/doodle.jpg';
import axios from '../../axios/axios';

const LOGIN_URL = '/auth/login';

const Login = (props) => {
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState('');
  const [userId, setUserId] = useState('');
  const [lowercaseUsername, setLowercaseUsername] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username !== '' || password !== '') {
      try {
        const response = await axios.post(
          LOGIN_URL,
          JSON.stringify({ username: lowercaseUsername, password }),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setLogin(true);
          props.handleUserId(response.data._id);
        }
        localStorage.setItem('userId', response.data._id);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Please fill in the form');
    }
  };

  return (
    <>
      {login ? (
        <Navigate to='/dashboard' />
      ) : (
        <div className='login-main'>
          <div className='side-doodle'>
            <img src={doodle} alt='doodle' className='doodle' />
          </div>
          <div className='login-form-wrapper'>
            <div className='login-form'>
              <h1>Sign in</h1>
              <form onSubmit={handleSubmit} className='form'>
                <label>Username</label>
                <input
                  type='text'
                  id='username'
                  autoComplete='off'
                  onChange={(e) => {
                  setUsername(e.target.value);
                  setLowercaseUsername(e.target.value.toLowerCase()); }}
                  value={username}
                  required
                  placeholder=''
                />
                <label>Password</label>
                <input
                  type='password'
                  id='password'
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  req
                  placeholder=''
                />
                <section>
                  <Link to='/register'>Don't have an account? Sign up.</Link>
                </section>
                <button type='submit'>Sign in</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
