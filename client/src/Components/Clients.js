import '../Styles/Clients.css';
import ClientForm from './ClientForm';
import ClientItem from './ClientItem';
import { useState } from 'react';

const Clients = () => {
  const [showForm, setShowForm] = useState(false);
  const handleShowForm = (data) => {
    setShowForm(data);
  };

  const clients = [
    {
      id: 1,
      name: 'John',
      surname: 'Doe',
      email: 'email@email.com',
      telephone: '697 1234567',
      address: 'KFC 123',
    },
    {
      id: 2,
      name: 'John',
      surname: 'Doe',
      email: 'email@email.com',
      telephone: '697 1234567',
      address: 'KFC 123',
    },
    {
      id: 3,
      name: 'John',
      surname: 'Doe',
      email: 'email@email.com',
      telephone: '697 1234567',
      address: 'KFC 123',
    },
    {
      id: 4,
      name: 'John',
      surname: 'Doe',
      email: 'email@email.com',
      telephone: '697 1234567',
      address: 'KFC 123',
    },
  ];
  return (
    <div className='clients-wrapper'>
      <div className='clients-header'>
        <h2 className='half-width-border'>Clients</h2>
        <button onClick={(e) => setShowForm(true)}>Add client</button>
        {showForm && <ClientForm handleShowForm={handleShowForm} />}
      </div>
      <div className='items'>
        <ClientItem clients={clients} />
      </div>
    </div>
  );
};
export default Clients;
