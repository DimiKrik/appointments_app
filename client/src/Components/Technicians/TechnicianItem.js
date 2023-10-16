import '../../Styles/AppointmentItem.css';
import delete_btn from '../../Assets/delete-btn.svg';
import edit_btn from '../../Assets/edit-btn.svg';
import TechnicianFormEdit from './TechnicianFormEdit';
import { useState } from 'react';
import axios from '../../axios/axios';

const TechnicianItem = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const deleteTechnician = async (id) => {
    try {
      const response = await axios.delete(`/users/${id}`);
      console.log(response.data);
      props.fetchUserData(true, 'deleted');
      props.timer();
    } catch (error) {
      console.error(error);
    }
  };
  const updateAppointment = ({ updateValue, runValue }) => {
    props.fetchUserData(true, 'updated');
    props.timer();
  };

  return (
    <div className='item'>
      {deleted && (
        <div className='delete_banner scale-in-top red'>
          <h3>
            Do you want to delete {props.firstName} {props.lastName}?
          </h3>
          <div className='delete_buttons'>
            <button onClick={() => deleteTechnician(props.id)}>Yes</button>
            <button onClick={() => setDeleted(!deleted)}>No</button>
          </div>
        </div>
      )}
      <p className='title-mobile'>Username</p>

      <p>{props.username}</p>
      <p className='title-mobile'>First name</p>

      <p>{props.firstName}</p>
      <p className='title-mobile'>Last name</p>

      <p>{props.lastName}</p>
      <p className='title-mobile'>Email</p>

      <p>{props.email}</p>
      <p className='title-mobile'>Phone</p>

      <p>{props.telephone}</p>
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
        <TechnicianFormEdit
          technician={props.technician}
          updateAppointment={updateAppointment}
          handleShowForm={setShowForm}
        />
      )}
    </div>
  );
};
export default TechnicianItem;
