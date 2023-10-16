import '../../Styles/Appointments.css';
import ClientForm from './ClientForm';
import ClientItem from './ClientItem';
import { useState, useEffect } from 'react';
import axios from '../../axios/axios';

const Clients = () => {
  const [showForm, setShowForm] = useState(false);
  const handleShowForm = (data) => {
    setShowForm(data);
  };
  const [clientData, setClientData] = useState({ username: '', firstName: '' });

  const [clients, setClients] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [action, setAction] = useState('');

  const fetchUserData = async (visible, action) => {
    try {
      const response = await axios.get('/users/getClients/clients');
      setClients(response.data);
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
    if (clientData) {
      fetchUserData();
    }
  }, [clientData]);

  return (
    <div className='appointments-wrapper'>
      {isVisible ? (
        <div className='delete_banner scale-in-top'>
          <p>Successfully client {action}.</p>
        </div>
      ) : null}
      <div className='appointments-header'>
        <h2 className='half-width-border'>Clients</h2>
        <button onClick={(e) => setShowForm(true)}>Add client</button>
        {showForm && (
          <ClientForm
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
        <p>Address</p>
        <p>Actions</p>
      </div>
      {clients.length === 0 ? (
        <div className='appointments-message'>
          <h2>No clients yet</h2>
        </div>
      ) : (
        <div className='items'>
          {clients.map((client) => (
            <ClientItem
              key={client._id}
              id={client._id}
              username={client.username}
              firstName={client.firstName}
              lastName={client.lastName}
              email={client.email}
              telephone={client.telephone}
              address={client.address}
              client={client}
              fetchUserData={fetchUserData}
              timer={timer}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default Clients;
