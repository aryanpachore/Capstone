import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useChat } from "../hooks/useChat";

const Chat = () => {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const { messages, loading, sending, sendMessage } = useChat(documentId);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-4 border-b bg-white p-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm text-gray-600 hover:underline"
        >
          ← Back
        </button>
        <h1 className="text-lg font-semibold">AI Legal Assistant</h1>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-6">
        {loading && (
          <p className="text-center text-sm text-gray-500">
            Loading chat history...
          </p>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xl rounded-2xl px-4 py-2 text-sm ${
                msg.role === "user"
                  ? "bg-black text-white"
                  : "bg-white text-gray-800 shadow"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {sending && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-white px-4 py-2 text-sm text-gray-500 shadow">
              AI is typing…
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="flex items-center gap-3 border-t bg-white p-4"
      >
        <input
          type="text"
          placeholder="Ask anything about this document…"
          className="flex-1 rounded-full border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={sending}
        />
        <button
          type="submit"
          disabled={sending}
          className="rounded-full bg-black px-5 py-2 text-sm text-white hover:bg-gray-800 disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
