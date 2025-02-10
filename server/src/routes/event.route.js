import express from 'express';
import { createEvent, getEvents} from '../controllers/event.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import{restrictGuest} from '../middlewares/auth.middleware.js';
const router = express.Router();
import { updateEvent, deleteEvent } from '../controllers/event.controller.js';

router.get('/', getEvents);

router.post('/', authMiddleware, restrictGuest, createEvent);
router.put('/:id', authMiddleware, restrictGuest, updateEvent);
router.delete('/:id', authMiddleware, restrictGuest, deleteEvent);

export default router;