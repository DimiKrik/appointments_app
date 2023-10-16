import { Link } from 'react-router-dom';
import '../Styles/Home.css';

const Home = () => {
  return (
    <div className='home'>
      <h1>Appointech</h1>
      <div className='home-buttons'>
        <Link to='/login' className='home-button'>
          Login
        </Link>
        <Link to='/register' className='home-button'>
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
