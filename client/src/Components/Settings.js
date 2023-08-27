import '../Styles/Settings.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axios/axios';

const Settings = () => {
  return (
    <div>
      {/* <Topnav /> */}
      <div className='settings-wrapper'>
        {/* <Navbar /> */}
        <h1>Settings</h1>
      </div>
    </div>
  );
};

export default Settings;
