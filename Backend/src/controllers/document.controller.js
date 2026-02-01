import * as documentRepository from '../repositories/document.repository.js';
import * as aiService from '../services/ai.service.js'; // Import the new service

export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // 1. Create DB Record (Initial Status: PENDING)
    const newDoc = await documentRepository.createDocument({
      userId: req.user.id,
      originalName: req.file.originalname,
      storagePath: req.file.path,
      mimeType: req.file.mimetype,
      status: 'PENDING'
    });

    // 2. Respond to User IMMEDIATELY
    res.status(201).json({ 
      message: 'File uploaded successfully. Processing started.', 
      document: newDoc 
    });

    // 3. Trigger Background AI Processing
    // We do NOT await this. It runs in the background.
    aiService.processDocument(newDoc.id, newDoc.storagePath);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ... keep getUserDocuments as is
export const getUserDocuments = async (req, res) => {
  try {
    const docs = await documentRepository.findDocumentsByUser(req.user.id);
    res.status(200).json(docs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};