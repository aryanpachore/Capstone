import ChatMessage from '../models/ChatMessage.js';

export const saveMessage = async (data) => {
  return await ChatMessage.create(data);
};

export const getChatHistory = async (documentId) => {
  return await ChatMessage.findAll({
    where: { documentId },
    order: [['createdAt', 'ASC']], // Oldest messages at the top
  });
};