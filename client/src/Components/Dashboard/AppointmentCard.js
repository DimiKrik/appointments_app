import "../../Styles/AppointmentCard.css";
import calendar from "../../Assets/calendar.svg";
import time from "../../Assets/time.svg";
import user from "../../Assets/user.svg";
import typeService from "../../Assets/type.svg";
import euro from "../../Assets/euro.svg";
import axios from "../../axios/axios.js";
import React from "react";
import { useState, useEffect } from "react";

const AppointmentCard = ({
  appointment,
}) => {

  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);

  const [appointments, setAppointments] = useState([]);

  if (!appointment) return null;

  return appointment.length === 0 ? (
    <div className="appointments-message">
      <h2>No appointments yet</h2>
    </div>
  ) : (
    <div className="appointment-cards">
      {appointment.map((appointment) => (
        // <div className='appointment-card' key={appointment.id}>
        <div className="appointment-card-header" key={appointment._id}>
          <p>
            <img src={calendar} alt="calendar" />
            {new Date(appointment.app_date).toISOString().split("T")[0]}          </p>
          <p>
            <img src={time} alt="calendar" />
            {appointment.pref_time}
          </p>
          <p>
            <img src={user} alt="calendar" />
            {appointment.technician_id.firstName && appointment.technician_id.lastName
    ? `${appointment.technician_id.firstName} ${appointment.technician_id.lastName}`
    : "-"}          </p>
          <p>
            <img src={typeService} alt="calendar" />
            {appointment.service_id.name || " Not Yet Defined"}
          </p>
          <p>
            <img src={euro} alt="calendar" />
            {appointment.totalPrice}
          </p>
        </div>
        // </div>
      ))}
    </div>
  );
};

export default AppointmentCard;
