import '../../Styles/Appointments.css';
import { useEffect, useState } from 'react';
import axios from '../../axios/axios';

const ToolsFormEdit = (props) => {
  const [type, setType] = useState(props.tool.type);
  const [toolName, setToolName] = useState(props.tool.toolName);
  const [price, setPrice] = useState(props.tool.price);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTool = {
      type,
      toolName,
      price,
    };

    try {
      const response = await axios.put(`/tools/${props.tool._id}`, updatedTool);
      console.log('Tool added successfully:', response.data);

      // Close the form or handle any other actions upon successful submission
      props.handleShowForm(false);
      props.updateAppointment(true, 'updated');
      props.timer();
    } catch (error) {
      console.error('Error adding service:', error);
      // Handle error states or display an error message to the user
    }
  };

  const handleShowForm = () => {
    props.handleShowForm(false);
  };

  return (
    <div className='appointment-form-wrapper '>
      <form className='appointment-form scale-up-center'>
        <h2>Update tool</h2>
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
            Update tool
          </button>
          <button onClick={handleShowForm}>Cancel</button>
        </div>
      </form>
    </div>
  );
};
export default ToolsFormEdit;
