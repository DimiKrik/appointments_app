import '../../Styles/AppointmentItem.css';
import delete_btn from '../../Assets/delete-btn.svg';
import edit_btn from '../../Assets/edit-btn.svg';
import { useState } from 'react';
import axios from '../../axios/axios';
import ToolsFormEdit from './ToolsFormEdit';

const ToolsItem = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const deleteTool = async (id) => {
    try {
      const response = await axios.delete(`/tools/${id}`);
      console.log(response.data);
      props.fetchToolsData(true, 'deleted');
      props.timer();
    } catch (error) {
      console.error(error);
    }
  };

  const updateAppointment = ({ updateValue, runValue }) => {
    props.fetchToolsData(true, 'updated');
    props.timer();
  };

  return (
    <div className='item'>
      {deleted && (
        <div className='delete_banner scale-in-top red'>
          <h3>Do you want to delete {props.toolName}?</h3>
          <div className='delete_buttons'>
            <button onClick={() => deleteTool(props.id)}>Yes</button>
            <button onClick={() => setDeleted(!deleted)}>No</button>
          </div>
        </div>
      )}
      <p className='title-mobile'>Type</p>

      <p>{props.type}</p>
      <p className='title-mobile'>Tool name</p>

      <p>{props.toolName}</p>
      <p className='title-mobile'>Price</p>

      <p>{props.price}</p>
      
      <p className='title-mobile'>Actions</p>

      <p className='actions'>
        <button className='btn-edit' onClick={() => setShowForm(!showForm)}>
          <img src={edit_btn} alt='edit' />
        </button>
      
      { props.isAdmin && (
        <button className='btn-del' onClick={() => setDeleted(!deleted)}>
          <img src={delete_btn} alt='delete' />
        </button>)}
      </p>
      {showForm && (
        <ToolsFormEdit
          tool={props.tool}
          updateAppointment={updateAppointment}
          handleShowForm={setShowForm}
        />
      )}
    </div>
  );
};
export default ToolsItem;
