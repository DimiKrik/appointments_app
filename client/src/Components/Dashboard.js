import '../Styles/Dashboard.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axios/axios';
import calendar from '../Assets/calendar.svg';
import calendar_white from '../Assets/calendar_white.svg';
import AppointmentForm from './AppointmentForm';
import AppointmentCard from './AppointmentCard';

const ADMIN_URL = '/auth/check-admin';


const Dashboard = (props) => {
  const [name, setName] = useState(props.name);
  const [src, setSrc] = useState(calendar);
  const [showForm, setShowForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [ technician_id, setTechnician_Id] = useState([]);
  



  // useEffect(() => {
  //   const checkAdmin = async () => {
  //     try {
  //       const response = await axios.get(ADMIN_URL, {
  //         headers: { 'Content-Type': 'application/json' },
  //         withCredentials: true,
  //       });
  //       if (true) {
  //         console.log(response.data);
  //         setIsAdmin(true);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   checkAdmin();
  // }, []);
  const appointments = [
    {
      id: 1,
      date: '2021-10-10',
      time: '10:00',
      technician_id: technician_id,
      type: 'Repair',
      status: true,
      price: 100,
    },
    {
      id: 2,
      date: '2021-10-10',
      time: '10:00',
      technician: 'John Doe',
      type: 'Repair',
      status: true,
      price: 105,
    },
    {
      id: 3,
      date: '2021-10-10',
      time: '10:00',
      technician: 'John Doe',
      type: 'Repair',
      status: true,
      price: 100,
    },
    {
      id: 4,
      date: '2021-10-10',
      time: '10:00',
      technician: 'John Doe',
      type: 'Repair',
      status: true,
      price: 100,
    },
  ];

  const handleShowForm = (data) => {
    setShowForm(data);
  };

  return (
    <div className='dashboard-wrapper'>
      <div className='dashboard-header'>
        <h1>Hello, {name}</h1>
        <button
          onMouseOver={(e) => setSrc(calendar_white)}
          onMouseOut={(e) => setSrc(calendar)}
          onClick={(e) => setShowForm(true)}
        >
          <img src={src} alt='calendar' />
          New appointment
        </button>
        {showForm && <AppointmentForm handleShowForm={handleShowForm} />}
      </div>
      <div className='active-appointments'>
        <p className='half-width-border'>Your appointments</p>
        <div className='appointments-wrapper'>
          <AppointmentCard
            appointment={appointments}
            isAdmins={props.isAdmin}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
