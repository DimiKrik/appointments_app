import '../../Styles/Dashboard.css';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import axios from '../../axios/axios';
import calendar from '../../Assets/calendar.svg';
import calendar_white from '../../Assets/calendar_white.svg';
import AppointmentForm from './AppointmentForm';
import AppointmentCard from './AppointmentCard';

const ADMIN_URL = '/auth/check-admin';

const Dashboard = (props) => {
  const [greeting, setGreeting] = useState(''); 
  const [name, setName] = useState(props.name);
  const [src, setSrc] = useState(calendar);
  const [showForm, setShowForm] = useState(false);
  const [technician_id, setTechnician_Id] = useState([]);
  const location = useLocation();
  const { userId } = useParams();

  const storedUserId = localStorage.getItem('userId');

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `/appointments/appbyuserid/${storedUserId}`
        );
        setAppointments(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (storedUserId) {
      fetchUserData();
    }

    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 12) {
      setGreeting('Good morning');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, [storedUserId]);

  const handleShowForm = (data) => {
    setShowForm(data);
  };

  return (
    <div className='dashboard-wrapper'>
      <div className='dashboard-header'>
      <h1>{greeting} {name}</h1> 
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
        <div className='dashboard-appointments-wrapper'>
          <AppointmentCard
            appointment={appointments}
            isAdmins={props.isAdmin}
            thisId={props.thisuserId}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
