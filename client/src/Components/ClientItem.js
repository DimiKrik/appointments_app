import '../Styles/ClientItem.css';

const ClientItem = ({ clients }) => {
  return clients.length === 0 ? (
    <div className='clients-message'>
      <h2>No clients yet</h2>
    </div>
  ) : (
    <div className='client-items'>
      <div className='items-header'>
        <p>Name</p>
        <p>Surname</p>
        <p>Email</p>
        <p>Telephone</p>
        <p>Address</p>
      </div>
      {clients.map((client) => (
        <div key={client.id} className='item'>
          <p>{client.name}</p>
          <p>{client.surname}</p>
          <p>{client.email}</p>
          <p>{client.telephone}</p>
          <p>{client.address}</p>
        </div>
      ))}
    </div>
  );
};
export default ClientItem;
