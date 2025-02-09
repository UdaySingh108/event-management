import http from "http";
import {Server} from "socket.io";
import app from "./app.js";

import dotenv from "dotenv";
dotenv.config({
    path:'./.env'
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  }
});

io.on('connection', (socket) => {
  console.log('New connection:', socket.id);

  socket.on('joinEvent', (eventId) => {
    io.emit('attendeeUpdate', { eventId, action: 'joined' });
  });

  socket.on('leaveEvent', (eventId) => {
    io.emit('attendeeUpdate', { eventId, action: 'left' });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

