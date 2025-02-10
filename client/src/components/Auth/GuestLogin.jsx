import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GuestLogin = () => {
  const navigate = useNavigate();

  const handleGuestLogin = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/guest-login`);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', 'guest'); 
      alert('Logged in as Guest!');
      navigate('/dashboard');
    } catch (err) {
      alert('Guest login failed.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Welcome, Guest!</h2>
      <button onClick={handleGuestLogin} style={{ padding: '10px 20px' }}>Continue as Guest</button>
    </div>
  );
};

export default GuestLogin;
