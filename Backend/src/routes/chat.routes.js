import express from 'express';
import { sendMessage, getHistory } from '../controllers/chat.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

// All chat routes are protected
router.post('/', authenticateToken, sendMessage);
router.get('/:documentId', authenticateToken, getHistory);

export default router;