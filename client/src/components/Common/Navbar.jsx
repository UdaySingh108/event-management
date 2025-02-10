import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav style={{ background: '#4caf50', padding: '10px', display: 'flex', justifyContent: 'space-between', borderRadius: '8px' }}>
      <div>
        <Link to="/dashboard">Dashboard</Link>
        {token && userRole !== 'guest' && <Link to="/create-event">Create Event</Link>}
      </div>
      <div>
        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <button onClick={() => navigate('/guest-login')}>Guest Login</button> 
          </>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
