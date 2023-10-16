import '../../Styles/Appointments.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axios/axios';
import AppointmentItem from './AppointmentItem';

const Appointments = (props) => {
  const [technician_id, setTechnician_Id] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [updated, setUpdated] = useState(false);
  const storedUserId = localStorage.getItem('userId');

  let response; 
  const fetchUserData = async (visible, updated) => {
    try {
      if (props.isAdmin) {
        response = await axios.get(`/appointments/admin/getallAppointmentsAdmin/`);
    } else {
      response = await axios.get(`/appointments/getallAppointmentbyUserId/${storedUserId}`);}

      const populatedAppointments = response.data.map((appointment) => {
        const technicianUsername = appointment.technician_id
          ? appointment.technician_id.username
          : ' - ';
        const userUsername = appointment.user_id
          ? appointment.user_id.username
          : 'Deleted';
        const serviceName = appointment.service_id
          ? appointment.service_id.name
          : 'Not Defined';

        return {
          ...appointment,
          technicianUsername,
          userUsername,
          serviceName,
        };
      });

      setAppointments(populatedAppointments);
      setIsVisible(visible);
      setUpdated(updated);
    } catch (error) {
      console.error(error);
    }
  };

  const timer = () => {
    setTimeout(() => {
      setIsVisible(false);
      console.log(updated);
    }, 2000);
    setUpdated(false);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    if (storedUserId) {
      fetchUserData();
    }
  }, [storedUserId,props.isAdmin]);

  return (
    <div className='appointments-wrapper'>
      {isVisible ? (
        <div className='delete_banner scale-in-top'>
          <p>Successfully appointment {updated ? 'updated' : 'deleted'}.</p>
        </div>
      ) : null}
      <div className='appointments-header'>
        <h2 className='half-width-border'>Appointments history</h2>
      </div>
      <div className='items-header'>
        <p>Date</p>
        <p>Time</p>
        <p>Client</p>
        <p>Address</p>
        <p>Technician</p>
        <p>Type</p>
        <p>Price</p>
        <p>Status</p>
        {(props.isTechnician || props.isAdmin) && <p>Actions</p>}
      </div>
      {appointments.length === 0 ? (
        <div className='appointments-message'>
          <h2>No appointments yet</h2>
        </div>
      ) : (
        <div className='items'>
          {appointments.map((appointment) => (
            <AppointmentItem
              key={appointment._id}
              id={appointment._id}
              date={appointment.app_date}
              time={appointment.pref_time}
              address={appointment.user_id.address}
              client={appointment.userUsername}
              technician={appointment.technicianUsername}
              type={appointment.serviceName}
              status={appointment.status}
              totalPrice={appointment.totalPrice}
              isAdmin={props.isAdmin}
              isTechnician={props.isTechnician}
              appointment={appointment}
              fetchUserData={fetchUserData}
              timer={timer}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default Appointments;
