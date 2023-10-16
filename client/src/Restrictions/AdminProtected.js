import { Navigate } from 'react-router-dom';

const Restricted = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to='/' replace />;
  }
  return children;
};
export default Restricted;
