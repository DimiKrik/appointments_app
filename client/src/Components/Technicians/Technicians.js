import '../../Styles/Appointments.css';
import TechnicianForm from './TechnicianForm';
import TechnicianItem from './TechnicianItem';
import { useState, useEffect } from 'react';
import axios from '../../axios/axios';

const Technicians = () => {
  const [showForm, setShowForm] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [action, setAction] = useState('');
  const handleShowForm = (data) => {
    setShowForm(data);
  };

  const [technicianData, setTechnicianData] = useState({
    username: '',
    firstName: '',
  });

  const [technicians, setTechnicians] = useState([]);

  const fetchUserData = async (visible, action) => {
    try {
      const response = await axios.get('/users/getTechnician/technicians');
      setTechnicians(response.data);
      setIsVisible(visible);
      setAction(action);
    } catch (error) {
      console.error(error);
    }
  };

  const timer = () => {
    setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    if (technicianData) {
      fetchUserData();
    }
  }, [technicianData]);

  return (
    <div className='appointments-wrapper'>
      {isVisible ? (
        <div className='delete_banner scale-in-top'>
          <p>Successfully technician {action}.</p>
        </div>
      ) : null}
      <div className='appointments-header'>
        <h2 className='half-width-border'>Technicians</h2>
        <button onClick={(e) => setShowForm(true)}>Add technician</button>
        {showForm && (
          <TechnicianForm
            handleShowForm={handleShowForm}
            fetchUserData={fetchUserData}
            timer={timer}
          />
        )}
      </div>
      <div className='items-header'>
      <p>Username</p>
        <p>Name</p>
        <p>Surname</p>
        <p>Email</p>
        <p>Telephone</p>
        <p>Actions</p>
      </div>
      {technicians.length === 0 ? (
        <div className='appointments-message'>
          <h2>No technicians yet</h2>
        </div>
      ) : (
        <div className='items'>
          {technicians.map((technician) => (
            <TechnicianItem
              key={technician._id}
              id={technician._id}
              username={technician.username}
              firstName={technician.firstName}
              lastName={technician.lastName}
              email={technician.email}
              telephone={technician.telephone}
              technician={technician}
              fetchUserData={fetchUserData}
              timer={timer}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default Technicians;
