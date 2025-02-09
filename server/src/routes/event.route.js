import express from 'express';
import { createEvent, getEvents } from '../controllers/event.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', authMiddleware, createEvent);
router.get('/', getEvents);

export default router;