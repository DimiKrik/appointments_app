import '../../Styles/AppointmentItem.css';
import delete_btn from '../../Assets/delete-btn.svg';
import edit_btn from '../../Assets/edit-btn.svg';
import { useState } from 'react';
import axios from '../../axios/axios';
import ServiceFormEdit from './ServiceFormEdit';

const ServiceItem = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const deleteService = async (id) => {
    try {
      const response = await axios.delete(`/services/${id}`);
      console.log(response.data);
      props.fetchServices(true, 'deleted');
      props.timer();
    } catch (error) {
      console.error(error);
    }
  };

  const updateService = ({ updateValue, runValue }) => {
    props.fetchServices(true, 'updated');
    props.timer();
  };

  return (
    <div className='item'>
      {deleted && (
        <div className='delete_banner scale-in-top red'>
          <h3>Do you want to delete this service?</h3>
          <div className='delete_buttons'>
            <button onClick={() => setDeleted(!deleted)}>No</button>
            <button onClick={() => deleteService(props.id)}>Yes</button>
          </div>
        </div>
      )}
      <p className='title-mobile'>Name</p>

      <p>{props.name}</p>
      <p className='title-mobile'>Price</p>

      <p>{props.price}</p>
      <p className='title-mobile'>Actions</p>

      <p className='actions'>
        <button className='btn-edit' onClick={() => setShowForm(!showForm)}>
          <img src={edit_btn} alt='edit' />
        </button>
        <button className='btn-del' onClick={() => setDeleted(!deleted)}>
          <img src={delete_btn} alt='delete' />
        </button>
      </p>
      {showForm && (
        <ServiceFormEdit
          service={props.service}
          updateService={updateService}
          handleShowForm={setShowForm}
        />
      )}
    </div>
  );
};
export default ServiceItem;
