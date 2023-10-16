import '../../Styles/AppointmentForm.css';
import { useEffect, useState } from 'react';
import axios from '../../axios/axios';

const ServiceFormEdit = (props) => {
  const [name, setName] = useState(props.service.name);
  const [price, setPrice] = useState(props.service.price);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedService = {
      name,
      price,
    };
    try {
      const response = await axios.put(
        `/services/${props.service._id}`,
        updatedService
      );
      console.log('Service added successfully:', response.data);
      // Close the form or handle any other actions upon successful submission
      props.handleShowForm(false);
      props.updateService(true, 'updated');
    } catch (error) {
      console.error('Error adding technician:', error);
      // Handle error states or display an error message to the user
    }
  };

  const handleShowForm = () => {
    props.handleShowForm(false);
  };

  return (
    <div className='appointment-form-wrapper '>
      <form className='appointment-form scale-up-center'>
        <h2>Update service</h2>
        <label>Name</label>
        <input
          type='text'
          name='name'
          id='name'
          autoComplete='off'
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
        <label>Price</label>
        <input
          type='text'
          name='price'
          id='price'
          autoComplete='off'
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          required
        />
        <div className='form-buttons'>
          <button onClick={handleUpdate} id='submit-button'>
            Update service
          </button>
          <button onClick={handleShowForm}>Cancel</button>
        </div>
      </form>
    </div>
  );
};
export default ServiceFormEdit;
