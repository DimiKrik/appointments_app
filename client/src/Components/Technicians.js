import '../Styles/Technicians.css';
import TechnicianForm from './TechnicianForm';
import TechnicianItem from './TechnicianItem';
import { useState } from 'react';

const Technicians = () => {
  const [showForm, setShowForm] = useState(false);
  const handleShowForm = (data) => {
    setShowForm(data);
  };

  const technicians = [
    {
      id: 1,
      name: 'John',
      surname: 'Doe',
      email: 'email@email.com',
      telephone: '6971234567',
    },
    {
      id: 2,
      name: 'John',
      surname: 'Doe',
      email: 'email@email.com',
      telephone: '6971234567',
    },
    {
      id: 3,
      name: 'John',
      surname: 'Doe',
      email: 'email@email.com',
      telephone: '6971234567',
    },
    {
      id: 4,
      name: 'John',
      surname: 'Doe',
      email: 'email@email.com',
      telephone: '6971234567',
    },
  ];
  return (
    <div className='technicians-wrapper'>
      <div className='technicians-header'>
        <h2 className='half-width-border'>Technicians</h2>
        <button onClick={(e) => setShowForm(true)}>Add client</button>
        {showForm && <TechnicianForm handleShowForm={handleShowForm} />}
      </div>
      <div className='items'>
        <TechnicianItem technicians={technicians} />
      </div>
    </div>
  );
};
export default Technicians;
