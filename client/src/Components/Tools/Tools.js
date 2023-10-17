import '../../Styles/Appointments.css';
import ToolsForm from './ToolsForm';
import ToolsItem from './ToolsItem';
import { useState, useEffect } from 'react';
import axios from '../../axios/axios';

const Tools = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [action, setAction] = useState('');
  const handleShowForm = (data) => {
    setShowForm(data);
  };

  const [toolsData, setToolsData] = useState({
    type: '',
    toolName: '',
    price: '',
  });

  const [tools, setTools] = useState([]);

  const fetchToolsData = async (visible, action) => {
    try {
      const response = await axios.get('/tools/');
      setTools(response.data);
      setIsVisible(visible);
      setAction(action);
    } catch (error) {
      console.error(error);
    }
  };

  const timer = () => {
    setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    if (toolsData) {
      fetchToolsData();
    }
  }, [toolsData]);

  return (
    <div className='appointments-wrapper'>
      {isVisible ? (
        <div className='delete_banner scale-in-top'>
          <p>Successfully tool {action}.</p>
        </div>
      ) : null}
      <div className='appointments-header'>
        <h2 className='half-width-border'>Tools</h2>
        <button onClick={(e) => setShowForm(true)}>Add tool</button>
        {showForm && (
          <ToolsForm
            handleShowForm={handleShowForm}
            fetchToolsData={fetchToolsData}
            timer={timer}
          />
        )}
      </div>

      <div className='items-header'>
        <p>Type</p>
        <p>Name</p>
        <p>Price</p>
        <p>Actions</p>
      </div>
      {tools.length === 0 ? (
        <div className='appointments-message'>
          <h2>No tools yet</h2>
        </div>
      ) : (
        <div className='items'>
          {tools.map((tool) => (
            <ToolsItem
              tool={tool}
              key={tool.id}
              id={tool._id}
              type={tool.type}
              toolName={tool.toolName}
              price={tool.price}
              fetchToolsData={fetchToolsData}
              timer={timer}
              isAdmin={props.isAdmin} 
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default Tools;
