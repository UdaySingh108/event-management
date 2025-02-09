import express from 'express';
import cors from 'cors';
import connectDB from './db/db.js';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import eventRoutes from './routes/event.route.js';

dotenv.config();
connectDB()
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

export default app;