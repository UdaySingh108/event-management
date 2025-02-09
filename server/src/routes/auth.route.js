import express from 'express';
import { register, login,guestLogin } from '../controllers/auth.controller.js';


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/guest-login', guestLogin);

export default router;