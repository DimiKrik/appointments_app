import '../Styles/Navbar.css';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
const Navbar = (props) => {
  const name = props.name;
  const surname = props.surname;
  const location = useLocation();
  const pathname = location.pathname;

  const isAdmin = true;

  return (
    <nav className='navbar'>
      <p>
        {name} {surname}
      </p>
      <div className='links'>
        <Link
          to='/dashboard'
          className={pathname === '/dashboard' ? 'active' : ''}
        >
          Dashboard
        </Link>
        <Link
          to='/appointments'
          className={pathname === '/appointments' ? 'active' : ''}
        >
          Appointments
        </Link>
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
            Technician
          </Link>
        )}
        <Link
          to='/settings'
          className={pathname === '/settings' ? 'active' : ''}
        >
          Settings
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;
