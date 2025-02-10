import http from 'http';
import app from './app.js';
import { Server } from 'socket.io';
import Event from './models/event.model.js';

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin:"*",
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('New connection:', socket.id);

 
  socket.on('joinEvent', async (eventId) => {
    console.log(`received join event for ${eventId}`);
    try {
      const event = await Event.findById(eventId);
      if (event) {
        if (!event.attendees.includes(socket.id)) { // Prevent duplicate joins
          event.attendees.push(socket.id); 
          await event.save();

         
          io.emit('attendeeUpdate', { eventId, attendeeCount: event.attendees.length });
          console.log(`User ${socket.id} joined event: ${eventId}, Attendees: ${event.attendees.length}`);
        }
      }
    } catch (error) {
      console.error('Join event error:', error);
    }
  });

  
  socket.on('leaveEvent', async (eventId) => {
    try {
      const event = await Event.findById(eventId);
      if (event) {
        event.attendees = event.attendees.filter(id => id !== socket.id);
        await event.save();

       
        io.emit('attendeeUpdate', { eventId, attendeeCount: event.attendees.length });
        console.log(`User ${socket.id} left event: ${eventId}, Attendees: ${event.attendees.length}`);
      }
    } catch (error) {
      console.error('Leave event error:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
