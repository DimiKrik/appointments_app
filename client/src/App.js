import './Styles/App.css';
import { Routes, Route, Router } from 'react-router-dom';
import Login from './Components/Login-Register/Login';
import Register from './Components/Login-Register/Register';
import Register2 from './Components/Login-Register/Register2';
import Home from './Components/Home';
import Dashboard from './Components/Dashboard/Dashboard';
import Appointments from './Components/Appointments/Appointments';
import Settings from './Components/Settings';
import Topnav from './Components/Nav/Topnav';
import Navbar from './Components/Nav/Navbar';
import Clients from './Components/Clients/Clients';
import Technicians from './Components/Technicians/Technicians';
import Services from './Components/Services/Services';
import Tools from './Components/Tools/Tools';

import { useEffect, useState } from 'react';
import axios from './axios/axios.js';
import Protected from './Restrictions/Protected';
import Restricted from './Restrictions/AdminProtected';

function App() {
  const [userData, setUserData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    telephone: '',
  });
  const [userId, setUserId] = useState(null);
  const handleUserId = (newUserId) => {
    setUserId(newUserId);
  };

  const storedUserId = localStorage.getItem('userId');

  const [loginState, setLoginState] = useState(false);

  const [navOpen, setNavOpen] = useState(false);
 

  const openNavbar = (open) => {
    setNavOpen(open);
  };


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/users/${storedUserId}`);
        setUserData(response.data);
        setIsAdmin(response.data.isAdmin);
        setIsTechnician(response.data.isTechnician);
      } catch (error) {
        console.error(error);
      }
    };
    if (storedUserId) {
      fetchUserData();
    }
  }, [storedUserId]); 

  const [isAdmin, setIsAdmin] = useState('');

  const handleIsAdmin = (data) => {
    setIsAdmin(data);
  };
  const [isTechnician, setIsTechnician] = useState('');

  const handleIsTechnician = (data) => {
    setIsTechnician(data);
  };

  const { username, firstName, lastName, address, telephone, email,} = userData;

  return (
    <div className='main'>
      <Topnav storedUserId={storedUserId} openNavbar={openNavbar} />
      <div className='main-wrapper'>
        <div className='components-wrapper'>

          <Routes>
            <Route
              path='/'
              element={
                <Protected isLoggedIn={storedUserId}>
                  <Home />
                </Protected>
              }
            />
            <Route
              path='/login'
              element={
                <Protected isLoggedIn={storedUserId}>
                  <Login
                    handleUserId={handleUserId}
                    handleIsAdmin={handleIsAdmin}
                    handleIsTechnician={handleIsTechnician}
                  />
                </Protected>
              }
            />
            <Route
              path='/register'
              element={
                <Protected isLoggedIn={storedUserId}>
                  <Register />
                </Protected>
              }
            />
            <Route
              path='/register_2'
              element={
                <Protected isLoggedIn={storedUserId}>
                  <Register2 />
                </Protected>
              }
            />
            <Route
              path='/appointments'
              element={
                <Protected isLoggedIn={storedUserId}>
                  <Navbar
                    username={username}
                    isAdmin={isAdmin}
                    isTechnician={isTechnician}
                    navOpen={navOpen}
                    openNavbar={openNavbar}
                  />
                  <Appointments isAdmin={isAdmin} isTechnician={isTechnician} />
                </Protected>
              }
            />
            <Route
              path='/technicians'
              element={
                <Protected isLoggedIn={storedUserId}>
                  <Navbar
                    username={username}
                    isAdmin={isAdmin}
                    
                    navOpen={navOpen}
                    openNavbar={openNavbar}
                  />

                  <Technicians />
                </Protected>
              }
            />
            <Route
              path='/clients'
              element={
                <Protected isLoggedIn={storedUserId}>
                  <Navbar
                    username={username}
                    isAdmin={isAdmin}
                    navOpen={navOpen}
                    openNavbar={openNavbar}
                  />
                  <Clients />
                </Protected>
              }
            />
            <Route
              path='/services'
              element={
                <Protected isLoggedIn={storedUserId}>
                  <Navbar
                    username={username}
                    isAdmin={isAdmin}
                    isTechnician={isTechnician}
                    navOpen={navOpen}
                    openNavbar={openNavbar}
                  />
                  <Services />
                </Protected>
              }
            />
            <Route
              path='/tools'
              element={
                <Protected isLoggedIn={storedUserId}>
                  <Navbar
                    username={username}
                    isTechnician={isTechnician}

                    isAdmin={isAdmin}
                    navOpen={navOpen}
                    openNavbar={openNavbar}
                  />

                  <Tools isAdmin={isAdmin}/>
                </Protected>
              }
            />
            <Route
              path='/settings'
              element={
                <Protected isLoggedIn={storedUserId}>
                  <Navbar
                    username={username}
                    isAdmin={isAdmin}
                    isTechnician={isTechnician}

                    navOpen={navOpen}
                    openNavbar={openNavbar}
                  />
                  <Settings
                    firstName={firstName}
                    lastName={lastName}
                    telephone={telephone}
                    address={address}
                    email={email}
                  />
                </Protected>
              }
            />
            <Route
              path='/dashboard'
              element={
                <Protected isLoggedIn={storedUserId}>
                  <Navbar
                    username={username}
                    isAdmin={isAdmin}
                    isTechnician={isTechnician}

                    navOpen={navOpen}
                    openNavbar={openNavbar}
                  />
                  <Dashboard
                    name={firstName}
                    surname={lastName}
                    isAdmin={isAdmin}
                  />
                </Protected>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
