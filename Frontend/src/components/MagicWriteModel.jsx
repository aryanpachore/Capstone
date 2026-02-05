import { useState } from "react";
import { rewriteText, generateClause } from "../api/magic.api";

const MagicWriteModal = ({ open, onClose }) => {
  const [mode, setMode] = useState("rewrite"); // rewrite | generate
  const [text, setText] = useState("");
  const [instruction, setInstruction] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRewrite = async () => {
    setLoading(true);
    try {
      const data = await rewriteText({ text, instruction });
      setOutput(data.rewritten);
    } catch {
      setOutput("Failed to rewrite text.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const data = await generateClause({
        clauseType: instruction,
        context: text,
      });
      setOutput(data.clause);
    } catch {
      setOutput("Failed to generate clause.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-2xl space-y-4 rounded bg-white p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">✨ Magic Write</h2>
          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>

        {/* Mode */}
        <div className="flex gap-3">
          <button
            onClick={() => setMode("rewrite")}
            className={`rounded px-3 py-1 text-sm ${
              mode === "rewrite" ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            Rewrite
          </button>
          <button
            onClick={() => setMode("generate")}
            className={`rounded px-3 py-1 text-sm ${
              mode === "generate" ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            Generate Clause
          </button>
        </div>

        {/* Input */}
        <textarea
          rows={4}
          placeholder={
            mode === "rewrite"
              ? "Paste legal text here..."
              : "Context (e.g. Valid for 2 years)"
          }
          className="w-full rounded border p-2 text-sm"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type="text"
          placeholder={
            mode === "rewrite"
              ? "Instruction (e.g. Make it professional)"
              : "Clause Type (e.g. NDA, Termination)"
          }
          className="w-full rounded border p-2 text-sm"
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
        />

        {/* Action */}
        <button
          onClick={mode === "rewrite" ? handleRewrite : handleGenerate}
          disabled={loading}
          className="rounded bg-black px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          {loading ? "Processing..." : "Generate"}
        </button>

        {/* Output */}
        {output && (
          <div className="rounded bg-gray-50 p-3 text-sm text-gray-800">
            {output}
          </div>
        )}
      </div>
    </div>
  );
};

export default MagicWriteModal;
