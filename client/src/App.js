import './Styles/App.css';
import { Routes, Route, ProtectedRoute } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Register2 from './Components/Register2';
import Home from './Components/Home';
import Dashboard from './Components/Dashboard';
import Appointments from './Components/Appointments';
import Settings from './Components/Settings';
import Topnav from './Components/Topnav';
import Navbar from './Components/Navbar';
import Clients from './Components/Clients';
import Technicians from './Components/Technicians';
import { useEffect,useState } from 'react';
import axios from "./axios/axios.js";

function App() {
  const name = 'Name';
  const surname = 'Surname';
  //const [userId, setUserId] = useState([]);
  //const [userData, setUserData] = useState({ username: ''});

  //useEffect(() => {
  //  const fetchUserData = async () => {
  //    try {
  //      const response = await axios.get('/users/');
  //      setUserData(response.data);
  //    } catch (error) {
  //      console.error(error);
  //    }
  //  };
//
  //  fetchUserData();
  //}, [userData]); // Empty dependency array ensures the effect runs once

  //const { username } = userData;


  const [isAdmin, setIsAdmin] = useState(false);

  const handleIsAdmin = (data) => {
    setIsAdmin(data);
  };

  return (
    <div className='main'>
      <Topnav />
      <div className='main-wrapper'>
        <Navbar name={name} surname={surname} isAdmin={isAdmin} />
        <div className='components-wrapper'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/login'
              element={<Login handleIsAdmin={handleIsAdmin} />}
            />
            <Route path='/register' element={<Register />} />
            <Route path='/register_2' element={<Register2 />} />
            <Route
              path='/dashboard'
              element={
                <Dashboard name={name} surname={surname} isAdmin={isAdmin} />
              }
            />
            <Route path='/appointments' element={<Appointments />} />
            <Route path='/technicians' element={<Technicians />} />
            <Route path='/clients' element={<Clients />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/dashboard' element={<Dashboard name={name} surname={surname} isAdmin={isAdmin} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
