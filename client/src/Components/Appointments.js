import '../Styles/Appointments.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axios/axios';
import AppointmentItem from './AppointmentItem';

const Appointments = () => {
  const appointments = [
    {
      id: 1,
      date: '2021-10-10',
      time: '10:00',
      client: 'John Doe',
      technician: 'John Doe',
      type: 'Repair',
      status: true,
      price: 100,
    },
    {
      id: 2,
      date: '2021-10-10',
      time: '10:00',
      client: 'John Doe',
      technician: 'John Doe',
      type: 'Repair',
      status: true,
      price: 100,
    },
    {
      id: 3,
      date: '2021-10-10',
      time: '10:00',
      client: 'John Doe',
      technician: 'John Doe',
      type: 'Repair',
      status: true,
      price: 100,
    },
    {
      id: 4,
      date: '2021-10-10',
      time: '10:00',
      client: 'John Doe',
      technician: 'John Doe',
      type: 'Repair',
      status: true,
      price: 20,
    },
  ];
  return (
    <div className='appointments-wrapper'>
      <div className='appointments-header'>
        <h2 className='half-width-border'>Appointments history</h2>
      </div>
      <div className='items'>
        <AppointmentItem appointments={appointments} />
      </div>
    </div>
  );
};
export default Appointments;
