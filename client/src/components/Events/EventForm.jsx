import { useState } from 'react';
import axios from 'axios';

const EventForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${import.meta.env.VITE_API_URL}/events`,
        { title, description, date },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Event created successfully');
    } catch (err) {
      alert('Failed to create event');
    }
  };

  return (
    <form onSubmit={handleCreateEvent}>
      <h2>Create Event</h2>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <button type="submit">Create Event</button>
    </form>
  );
};

export default EventForm;
