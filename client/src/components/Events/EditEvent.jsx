import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditEvent = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState({ title: '', description: '', date: '' });
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/events`);
      const event = res.data.find((e) => e._id === id);
      setEventData(event);
    };
    fetchEvent();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/events/${id}`, eventData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Event updated successfully');
      navigate('/dashboard');
    } catch (error) {
      alert('Failed to update event');
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Edit Event</h2>
      <input
        type="text"
        value={eventData.title}
        onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
        required
      />
      <textarea
        value={eventData.description}
        onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
      />
      <input
        type="date"
        value={eventData.date.split('T')[0]}
        onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
        required
      />
      <button type="submit">Update Event</button>
    </form>
  );
};

export default EditEvent;
