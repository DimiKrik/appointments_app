import '../Styles/TechnicianItem.css';

const TechnicianItem = ({ technicians }) => {
  return technicians.length === 0 ? (
    <div className='technicians-message'>
      <h2>No clients yet</h2>
    </div>
  ) : (
    <div className='technician-items'>
      <div className='items-header'>
        <p>Name</p>
        <p>Surname</p>
        <p>Email</p>
        <p>Telephone</p>
      </div>
      {technicians.map((technician) => (
        <div key={technician.id} className='item'>
          <p>{technician.name}</p>
          <p>{technician.surname}</p>
          <p>{technician.email}</p>
          <p>{technician.telephone}</p>
        </div>
      ))}
    </div>
  );
};
export default TechnicianItem;
