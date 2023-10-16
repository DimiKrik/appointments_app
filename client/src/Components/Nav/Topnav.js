import '../../Styles/Topnav.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import applogo from '../../Assets/applogo2.png';
import burgermenu from '../../Assets/menu-closed.svg';

const Topnav = (props) => {
  const [open, setOpen] = useState(false);
  const storedUserId = localStorage.getItem('userId');

  if (!storedUserId) {
    return null;
  }

  return (
    <nav className='topnav'>
      <div className='menu desktop'>
        <button onClick={() => props.openNavbar(true)}>
          <img src={burgermenu} alt='hamburger menu' />
        </button>
      </div>
      <div className='logo'>
        <Link to='/'>
          <img src={applogo} alt='applogo' />
        </Link>
      </div>
    </nav>
  );
};
export default Topnav;
