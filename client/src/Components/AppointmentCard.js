import '../Styles/AppointmentCard.css';
import calendar from '../Assets/calendar.svg';
import time from '../Assets/time.svg';
import user from '../Assets/user.svg';
import typeService from '../Assets/type.svg';
import euro from '../Assets/euro.svg';
import axios from "../axios/axios.js";
import React from "react";
import { useState,useEffect } from 'react';




const AppointmentCard = ({ appointment, isAdmins, isTechnician }) => {
  // const isAdmin = props.isAdmin;
  const [isAdmin, setIsAdmin] = useState(false);
  console.log('is this user an admin?' + isAdmins);
  console.log('is this user a technician?' + isTechnician);
  
  

  if (!appointment) return null;

  return appointment.length === 0 ? (
    <div className='appointments-message'>
      <h2>No appointments yet</h2>
    </div>
  ) : (
    <div className='appointment-cards'>
      {appointment.map(appointment => (
        // <div className='appointment-card' key={appointment.id}>
        <div className='appointment-card-header' key={appointment.id}>
          <p>
            <img src={calendar} alt='calendar' />
            {appointment.date}
          </p>
          <p>
            <img src={time} alt='calendar' />
            {appointment.time}
          </p>
          <p>
            <img src={user} alt='calendar' />
            {appointment.technician_id}
          </p>
          <p>
            <img src={typeService} alt='calendar' />
            {appointment.service}
          </p>
          <p>
            <img src={euro} alt='calendar' />
            {appointment.price}
          </p>
          {isAdmins && <button>Completed</button>}

          <div className={appointment.status === true ? 'status' : ''}></div>
        </div>
        // </div>
      ))}
    </div>
  );
};

export default AppointmentCard;