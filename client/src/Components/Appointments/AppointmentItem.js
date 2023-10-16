import '../../Styles/AppointmentItem.css';
import delete_btn from '../../Assets/delete-btn.svg';
import edit_btn from '../../Assets/edit-btn.svg';
import axios from '../../axios/axios';
import AppointmentFormEdit from './AppointmentFormEdit';
import { cloneElement, useEffect, useState } from 'react';

const AppointmentItem = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const deleteAppointment = async (id) => {
    try {
      const response = await axios.delete(`/appointments/${id}`);
      console.log(response.data);
      props.fetchUserData(true);
      props.timer();
    } catch (error) {
      console.error(error);
    }
  };

  const updateAppointment = ({ updateValue, runValue }) => {
    props.fetchUserData(true, true);
    props.timer();
  };

  return (
    <div className='item'>
      {deleted && (
        <div className='delete_banner scale-in-top red'>
          <h3>Do you want to delete this appointment?</h3>
          <div className='delete_buttons'>
            <button onClick={() => deleteAppointment(props.id)}>Yes</button>
            <button onClick={() => setDeleted(!deleted)}>No</button>
          </div>
        </div>
      )}

      <p className='title-mobile'>Date</p>
      <p>{new Date(props.date).toISOString().split('T')[0]}</p>
      <p className='title-mobile'>Time</p>

      <p>{props.time}</p>
      <p className='title-mobile'>Client</p>

      <p>{props.client}</p>
      <p className='title-mobile'>Address</p>

      <p>{props.address || 'Missing'}</p>
      <p className='title-mobile'>Technician</p>

      <p>{props.technician}</p>

      <p className='title-mobile'>Type</p>

      <p>{props.type || ' - '}</p>
      <p className='title-mobile'>Price</p>

      <p>{props.totalPrice  || ' - '}€</p>
      <p className='title-mobile'>Status</p>

      <p>{props.status}</p>

      {(props.isTechnician || props.isAdmin) && (
      <p className='title-mobile'>Actions</p> )}
      {(props.isTechnician || props.isAdmin) && (

      <div className='actions'>
        {(props.isTechnician || props.isAdmin) && (
          <button className='btn-edit' onClick={() => setShowForm(!showForm)}>
            <img src={edit_btn} alt='edit' />
          </button>
        )}
        {props.isAdmin && (
          <button className='btn-del' onClick={() => setDeleted(!deleted)}>
            <img src={delete_btn} alt='delete' />
          </button>
        )}
      </div> )}

      {showForm && (
        <AppointmentFormEdit
          appointment={props.appointment}
          isAdmin={props.isAdmin}
          isTechnician={props.isTechnician}
          updateAppointment={updateAppointment}
          handleShowForm={setShowForm}
        />
      )}
    </div>
  );
};
export default AppointmentItem;
