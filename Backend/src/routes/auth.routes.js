import express from 'express';
import { register, login } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', register); // [cite: 37]
router.post('/login', login);       // [cite: 38]

export default router;