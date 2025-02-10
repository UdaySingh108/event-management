import { useEffect, useState } from 'react';
import axios from 'axios';
import socket from '../services/socket';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [attendees, setAttendees] = useState({});
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/events`);
      setEvents(res.data);

      const initialAttendees = {};
      res.data.forEach((event) => {
        initialAttendees[event._id] = event.attendees.length;
      });
      setAttendees(initialAttendees);
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    socket.on('attendeeUpdate', (data) => {
      console.log('Real-time update received:', data); 

      setAttendees((prev) => ({
        ...prev,
        [data.eventId]: data.attendeeCount
      }));
    });

    return () => socket.off('attendeeUpdate');
  }, []);

  const handleJoin = (eventId) => {
    console.log(`Emitting joinEvent for: ${eventId}`);
    socket.emit('joinEvent', eventId, (ack) => {
      console.log('Acknowledgment from server:', ack);
    });
  };

  const handleLeave = (eventId) => {
    socket.emit('leaveEvent', eventId);
    console.log(`Leaving event: ${eventId}`); 
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Upcoming Events</h2>
      {token && userRole !== 'guest' && (
        <button
          onClick={() => navigate('/create-event')}
          style={{
            backgroundColor: '#4caf50',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '20px',
          }}
        >
          Create Event
        </button>
      )}
      {events.map((event) => (
        <div key={event._id} className="event-card">
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>

          
          <p><strong>Attendees:</strong> {attendees[event._id] || 0}</p>

         
          {token && (
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => handleJoin(event._id)}>Join Event</button>
              <button onClick={() => handleLeave(event._id)} style={{ background: '#f44336' }}>Leave Event</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
