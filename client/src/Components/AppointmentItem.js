import '../Styles/AppointmentItem.css';

const AppointmentItem = ({ appointments }) => {
  return appointments.length === 0 ? (
    <div className='appointments-message'>
      <h2>No appointments yet</h2>
    </div>
  ) : (
    <div className='appointment-items'>
      <div className='items-header'>
        <p>Date</p>
        <p>Time</p>
        <p>Client</p>
        <p>Technician</p>
        <p>Type</p>
        <p>Status</p>
        <p>Price</p>
      </div>
      {appointments.map((appointment) => (
        <div key={appointment.id} className='item'>
          <p>{appointment.date}</p>
          <p>{appointment.time}</p>
          <p>{appointment.client}</p>
          <p>{appointment.technician}</p>
          <p>{appointment.type}</p>
          <p>{appointment.status}</p>
          <p>{appointment.price}</p>
        </div>
      ))}
    </div>
  );
};
export default AppointmentItem;
