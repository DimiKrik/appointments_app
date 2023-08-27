import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='home'>
      <h1>Home</h1>
      <Link to='/login'>Login</Link> <br></br>
      <Link to='/register'>Register</Link>
      <br></br>
      <Link to='/dashboard'> dashboard</Link>
    </div>
  );
};

export default Home;
