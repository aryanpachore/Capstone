import express from 'express';
import { uploadDocument, getUserDocuments } from '../controllers/document.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = express.Router();

// POST /api/documents/upload (Protected + File Upload)
router.post(
  '/upload', 
  authenticateToken, 
  upload.single('file'), // 'file' matches the form-data key
  uploadDocument
);

// GET /api/documents (Protected)
router.get('/', authenticateToken, getUserDocuments);

export default router;