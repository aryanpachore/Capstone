import * as documentRepository from '../repositories/document.repository.js';

export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Create DB Record
    const newDoc = await documentRepository.createDocument({
      userId: req.user.id, // Comes from auth middleware
      originalName: req.file.originalname,
      storagePath: req.file.path,
      mimeType: req.file.mimetype,
      status: 'PENDING'
    });

    res.status(201).json({ 
      message: 'File uploaded successfully', 
      document: newDoc 
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserDocuments = async (req, res) => {
  try {
    const docs = await documentRepository.findDocumentsByUser(req.user.id);
    res.status(200).json(docs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};