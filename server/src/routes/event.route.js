import express from 'express';
import { createEvent, getEvents} from '../controllers/event.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import{restrictGuest} from '../middlewares/auth.middleware.js';
const router = express.Router();

router.get('/', getEvents);
//restricted route for guest user
router.post('/', authMiddleware, restrictGuest, createEvent);

export default router;