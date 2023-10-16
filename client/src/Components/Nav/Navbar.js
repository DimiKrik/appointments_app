import '../../Styles/Navbar.css';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from '../../axios/axios.js';

const Navbar = (props) => {
  const name = props.username;
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const [login, setLogin] = useState(false);
  
  let isLoggedIn = false;
  if (name) {
    isLoggedIn = true;
  }

  const handleLogout = async () => {
    try {
      localStorage.removeItem('userId');

      setLogin(false);
      window.location.href = '/login';

    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(props.navOpen);
  }, [props.navOpen]);

  return (
    <nav
      className={open ? 'navbar slide-out-left' : 'navbar hidden'}
      onClick={() => props.openNavbar(false)}
    >
      <div className='links'>
        <div class='navbuttonsidle'>
          {isLoggedIn && (
          <Link
            to='/dashboard'
            className={pathname === '/dashboard' ? 'active' : ''}
          >
            Dashboard
          </Link>
        )}
        {isLoggedIn && (
          <Link
            to='/appointments'
            className={pathname === '/appointments' ? 'active' : ''}
          >
            Appointments
          </Link>
        )}


        { props.isAdmin && (
          <Link
          to='/services'
          className={pathname === '/services' ? 'active' : ''}
          >
            Services
          </Link>
        )}
        {(props.isTechnician || props.isAdmin) && (
          <Link to='/tools' className={pathname === '/tools' ? 'active' : ''}>
            Tools
          </Link>
        )}
        {props.isAdmin && (
          <Link
            to='/clients'
            className={pathname === '/clients' ? 'active' : ''}
          >
            Clients
          </Link>
        )}
        {props.isAdmin && (
          <Link
            to='/technicians'
            className={pathname === '/technicians' ? 'active' : ''}
          >
            Technicians
          </Link>
        )}
        {isLoggedIn && (
          <Link
            to='/settings'
            className={pathname === '/settings' ? 'active' : ''}
          >
            Settings
          </Link>
        )}
        {isLoggedIn && (
          <a class='logout' href='/' onClick={handleLogout}>
            Logout
          </a>
        )}</div>
      </div> 
    </nav>
  );
};
export default Navbar;
