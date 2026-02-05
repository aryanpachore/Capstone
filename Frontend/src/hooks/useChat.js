import { useEffect, useState } from "react";
import { fetchChatHistory, sendChatMessage } from "../api/chat.api";

export const useChat = (documentId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const data = await fetchChatHistory(documentId);
      setMessages(data);
    } catch (err) {
      console.error("Failed to load chat history", err);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    // Optimistic UI (show user msg immediately)
    const userMessage = {
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, userMessage]);

    setSending(true);
    try {
      const aiMessage = await sendChatMessage({
        documentId,
        message: text,
      });

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Failed to send message", err);
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    if (documentId) {
      loadHistory();
    }
  }, [documentId]);

  return {
    messages,
    loading,
    sending,
    sendMessage,
  };
};
