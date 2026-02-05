import api from "./axios";

// Get chat history for a document
export const fetchChatHistory = async (documentId) => {
  const response = await api.get(`/chat/${documentId}`);
  return response.data;
};

// Send a message to AI
export const sendChatMessage = async ({ documentId, message }) => {
  const response = await api.post("/chat", {
    documentId,
    message,
  });
  return response.data;
};
