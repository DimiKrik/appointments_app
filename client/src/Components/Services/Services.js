import '../../Styles/Appointments.css';
import ServiceForm from './ServiceForm';
import ServiceItem from './ServiceItem';
import { useState, useEffect } from 'react';
import axios from '../../axios/axios';

const Services = () => {
  const [showForm, setShowForm] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [action, setAction] = useState('');
  const handleShowForm = (data) => {
    setShowForm(data);
  };

  const [servicesData, setServicesData] = useState({
    type: '',
    price: '',
  });

  const [services, setServices] = useState([]);

  const fetchServices = async (visible, action) => {
    try {
      const response = await axios.get('/services/');
      setServices(response.data);
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
    if (servicesData) {
      fetchServices();
    }
  }, [servicesData]);

  return (
    <div className='appointments-wrapper'>
      {isVisible ? (
        <div className='delete_banner scale-in-top'>
          <p>Successfully service {action}.</p>
        </div>
      ) : null}
      <div className='appointments-header'>
        <h2 className='half-width-border'>Services</h2>
        <button onClick={(e) => setShowForm(true)}>Add service</button>
        {showForm && (
          <ServiceForm
            handleShowForm={handleShowForm}
            fetchServices={fetchServices}
            timer={timer}
          />
        )}
      </div>
      <div className='items-header'>
        <p>Name</p>
        <p>Price</p>
        <p>Actions</p>
      </div>
      {services.length === 0 ? (
        <div className='appointments-message'>
          <h2>No services yet</h2>
        </div>
      ) : (
        <div className='items'>
          {services.map((service) => (
            <ServiceItem
              key={service._id}
              id={service._id}
              name={service.name}
              price={service.price}
              service={service}
              fetchServices={fetchServices}
              timer={timer}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default Services;
