import * as chatService from '../services/chat.service.js';

export const sendMessage = async (req, res) => {
  try {
    const { documentId, message } = req.body;
    
    if (!documentId || !message) {
      return res.status(400).json({ error: 'Document ID and message are required.' });
    }

    const response = await chatService.processChatQuery(req.user.id, documentId, message);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getHistory = async (req, res) => {
  try {
    const { documentId } = req.params;
    const history = await chatService.getHistory(documentId);
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};