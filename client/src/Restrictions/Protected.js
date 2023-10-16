import { Navigate, useLocation } from 'react-router-dom';

const Protected = ({ isLoggedIn, children }) => {
  let home = useLocation().pathname === '/';
  let login = useLocation().pathname === '/login';
  let register = useLocation().pathname === '/register';
  let register2 = useLocation().pathname === '/register_2';
  if (
    (isLoggedIn && home) ||
    (isLoggedIn && login) ||
    (isLoggedIn && register) ||
    (isLoggedIn && register2)
  ) {
    return <Navigate to='/dashboard' replace />;
  } else if (!isLoggedIn && !home && !login && !register && !register2) {
    return <Navigate to='/' replace />;
  }
  return children;
};
export default Protected;
