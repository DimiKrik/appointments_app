import '../../Styles/Appointments.css';
import { useEffect, useState } from 'react';
import axios from '../../axios/axios';

const ToolsForm = (props) => {
  const [type, setType] = useState('');
  const [toolName, setToolName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTools = {
      type,
      toolName,
      price,
    };

    try {
      const response = await axios.post('/tools/', newTools);
      console.log('Tool added successfully:', response.data);

      props.handleShowForm(false);
      props.fetchToolsData(true, 'added');
      props.timer();
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const handleShowForm = () => {
    props.handleShowForm(false);
  };

  return (
    <div className='appointment-form-wrapper '>
      <form className='appointment-form scale-up-center'>
        <h2>Add new tool</h2>
        <label>Type</label>
        <input
          type='text'
          name='type'
          id='type'
          autoComplete='off'
          onChange={(e) => setType(e.target.value)}
          value={type}
          required
        />
        <label>Name</label>
        <input
          type='text'
          name='toolName'
          id='toolName'
          autoComplete='off'
          onChange={(e) => setToolName(e.target.value)}
          value={toolName}
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
          <button onClick={handleSubmit} id='submit-button'>
            Add tool
          </button>
          <button onClick={handleShowForm}>Cancel</button>
        </div>
      </form>
    </div>
  );
};
export default ToolsForm;
