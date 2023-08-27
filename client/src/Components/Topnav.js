import '../Styles/Topnav.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import user_icon from '../Assets/user-icon.svg';
const Topnav = () => {
  return (
    <nav className='topnav'>
      <div className='logo'>
        <p>logo</p>
      </div>
      <div className='search'>
        <input type='text' placeholder='Search' />
      </div>
      <div className='user-icon'>
        <img src={user_icon} alt='user-icon' />
      </div>
    </nav>
  );
};
export default Topnav;
