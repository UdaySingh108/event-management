import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import GuestLogin from './components/Auth/GuestLogin';
import Dashboard from './pages/Dashboard';
import EventForm from './components/Events/EventForm';
import Navbar from './components/Common/Navbar';
import './App.css';
import EditEvent from './components/Events/EditEvent';


const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        
        <Route path="/" element={<Navigate to="/login" />} />
        
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/guest-login" element={<GuestLogin />} />

      
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/create-event" element={<PrivateRoute><EventForm /></PrivateRoute>} />
        <Route path="/edit-event/:id" element={<PrivateRoute><EditEvent /></PrivateRoute>} />
        <Route path="/guest-login" element={<GuestLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
