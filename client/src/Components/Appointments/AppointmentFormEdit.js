import React, { useState, useEffect } from 'react';
import axios from '../../axios/axios';

const AppointmentFormEdit = (props) => {
  const [date, setDate] = useState(
    new Date(props.appointment.app_date).toISOString().split('T')[0]
  );
  const [time, setTime] = useState(props.appointment.pref_time);
  const [client, setClient] = useState(props.appointment.user_id.username);
  const [selectedService, setSelectedService] = useState('');
  const [selectedTool, setSelectedTool] = useState('');
  const [toolQuantities, setToolQuantities] = useState({}); // For tracking quantities
  const [selectedTechnician, setSelectedTechnician] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [services, setServices] = useState([]);
  const [tools, setTools] = useState([]); // Tools data

  useEffect(() => {
    axios
      .get('/services/') 
      .then((response) => {
        const servicesData = response.data;
        const servicesList = servicesData.map((service) => ({
          _id: service._id,
          name: service.name,
          price: service.price,
        }));
        setServices(servicesList);
        setSelectedService(props.appointment.service_id);
      })
      .catch((error) => {
        console.error('Error fetching services', error);
      });

    axios
      .get('/tools/') 
      .then((response) => {
        const toolsData = response.data;
        const toolsList = toolsData.map((tool) => ({
          _id: tool._id,
          name: tool.toolName,
          price: tool.price,
        }));
        setTools(toolsList);
      })
      .catch((error) => {
        console.error('Error fetching tools', error);
      });
  }, [props.appointment.service_id]);

  useEffect(() => {
    axios
      .get('/users/getTechnician/technicians')
      .then((response) => {
        const techniciansData = response.data;
        const techniciansList = techniciansData.map((technician) => ({
          _id: technician._id,
          firstName: technician.firstName,
          lastName: technician.lastName,
        }));
        setTechnicians(techniciansList);
      })
      .catch((error) => {
        console.error('Error fetching technicians', error);
      });
  }, []);
  const [technicians, setTechnicians] = useState([]);

  const handleEdit = async (e) => {
    e.preventDefault();

    const totalToolPrice = Object.keys(toolQuantities).reduce(
      (total, toolId) => {
        const quantity = toolQuantities[toolId] || 0;
        const toolObject = tools.find((tool) => tool._id === toolId);
        return total + (toolObject ? toolObject.price * quantity : 0);
      },
      0
    );

    const selectedServiceObject = services.find(
      (service) => service._id === selectedService
    );
    const selectedServicePrice = selectedServiceObject
      ? selectedServiceObject.price
      : 0;

    const calculatedTotalPrice = totalToolPrice + selectedServicePrice;

    const appointment = {
      app_date: date,
      pref_time: time,
      service_id: selectedService,
      tools: Object.keys(toolQuantities).map((toolId) => ({
        toolId,
        quantity: toolQuantities[toolId],
      })),
      technician_id: selectedTechnician,
      status: selectedStatus,
    };

    const hasChanges =
      calculatedTotalPrice !== props.appointment.totalPrice ||
      appointment.service_id !== props.appointment.service_id ||
      JSON.stringify(appointment.tools) !==
        JSON.stringify(props.appointment.tools);

    if (hasChanges || tools.length > 0 || selectedService) {
      if (calculatedTotalPrice < props.appointment.totalPrice) {
        appointment.totalPrice =
          props.appointment.totalPrice + calculatedTotalPrice;
      } else {
        appointment.totalPrice = calculatedTotalPrice;
      }
    } else {
      appointment.totalPrice = props.appointment.totalPrice;
    }

    try {
      const response = await axios.put(
        `/appointments/${props.appointment._id}`,
        appointment
      );
      console.log(response.data);
      props.handleShowForm(false);
      props.updateAppointment(true, true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowForm = () => {
    props.handleShowForm(false);
  };

  const handleToolChange = (e) => {
    setSelectedTool(e.target.value);
  };

  const handleAddTool = () => {
    if (selectedTool) {
      setToolQuantities((prevQuantities) => ({
        ...prevQuantities,
        [selectedTool]: 0, // Initialize quantity to 0 for the selected tool
      }));
    }
  };

  const handleRemoveTool = (toolId) => {
    setToolQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      delete newQuantities[toolId];
      return newQuantities;
    });
  };

  return (
    <div className='appointment-form-wrapper'>
      <form className='appointment-form scale-up-center'>
        <h2>Update appointment</h2>
        <label>Preferred date</label>
        <input
          type='date'
          name='date'
          id='date'
          autoComplete='off'
          onChange={(e) => setDate(e.target.value)}
          value={date}
          required
        />
        <label>Preferred time</label>
        <input
          type='time'
          name='time'
          id='time'
          autoComplete='off'
          onChange={(e) => setTime(e.target.value)}
          value={time}
          required
        />

        <label>Select Technician</label>
        <select
          name='technician'
          id='technician'
          onChange={(e) => setSelectedTechnician(e.target.value)}
          value={selectedTechnician}
          required
        >
          <option value=''>Select technician</option>
          {technicians.map((technician) => (
            <option key={technician._id} value={technician._id}>
              {technician.firstName} {technician.lastName}
            </option>
          ))}
        </select>
        <label>Select type of service</label>
        <select
          name='service_id'
          id='service_id'
          onChange={(e) => setSelectedService(e.target.value)}
          value={selectedService}
          required
        >
          <option value=''>Select service</option>
          {services.map((service) => (
            <option key={service._id} value={service._id}>
              {service.name}
            </option>
          ))}
        </select>

        <label>Select a tool</label>
        <select
          name='tool_id'
          id='tool_id'
          onChange={handleToolChange}
          value={selectedTool}
          required
        >
          <option value=''>Select tool</option>
          {tools.map((tool) => (
            <option key={tool._id} value={tool._id}>
              {tool.name}
            </option>
          ))}
        </select>
        <button type='button' onClick={handleAddTool}>
          Add Tool
        </button>
        <div className='tools-quantity'>
          {Object.keys(toolQuantities).map((toolId) => (
            <div key={toolId} className='tool-quantity'>
              <div className='quantity'>
              <label>
                {tools.find((tool) => tool._id === toolId).name} Quantity:
              </label>
              <input
                type='number'
                min='-100'
                max='100'
                name={`quantity_${toolId}`}
                value={toolQuantities[toolId]}
                onChange={(e) => {
                  const newQuantity = parseInt(e.target.value) || 0;
                  setToolQuantities((prevQuantities) => ({
                    ...prevQuantities,
                    [toolId]: newQuantity,
                  }));
                }}
              />
              </div>
              <button type='button' onClick={() => handleRemoveTool(toolId)}>
                X
              </button>
            </div>
          ))}
        </div>
        <label>Status</label>
        <select
          name='status'
          id='status'
          onChange={(e) => {
            const value = e.target.value;
            setSelectedStatus(
              value === 'true' ? true : value === 'false' ? false : null
            );
          }}
          value={
            selectedStatus === true
              ? 'true'
              : selectedStatus === false
              ? 'false'
              : ''
          }
          required
        >
          <option value=''>Select Status</option>
          <option value='true'>On Going</option>
          <option value='false'>Finished</option>
        </select>
        <div className='form-buttons'>
          <button onClick={handleEdit} id='submit-button'>
            Update appointment
          </button>
          <button onClick={handleShowForm}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentFormEdit;
