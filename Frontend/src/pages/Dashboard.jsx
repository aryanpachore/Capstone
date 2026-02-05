import { useNavigate } from "react-router-dom";
import { useDocuments } from "../hooks/useDocuments";
import { useState } from "react";

import MagicWriteModal from "../components/MagicWriteModal";
import SummaryCard from "../components/SummaryCard";

const Dashboard = () => {
  const { documents, loading, uploading, handleUpload } = useDocuments();
  const navigate = useNavigate();

  // Magic Write modal state
  const [openMagic, setOpenMagic] = useState(false);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Your Documents</h1>

        <div className="flex items-center gap-3">
          {/* Magic Write Button */}
          <button
            onClick={() => setOpenMagic(true)}
            className="rounded bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
          >
            ✨ Magic Write
          </button>

          {/* Upload Button */}
          <label className="cursor-pointer rounded bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
            {uploading ? "Uploading..." : "Upload PDF"}
            <input
              type="file"
              accept="application/pdf"
              hidden
              onChange={(e) => {
                if (e.target.files[0]) {
                  handleUpload(e.target.files[0]);
                }
              }}
            />
          </label>
        </div>
      </div>

      {/* Loading / Empty */}
      {loading && <p>Loading documents...</p>}

      {!loading && documents.length === 0 && (
        <p className="text-gray-500">No documents uploaded yet.</p>
      )}

      {/* Documents Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc) => (
          <div
            key={doc.id}
            onClick={() => navigate(`/chat/${doc.id}`)}
            className="cursor-pointer rounded border p-4 shadow-sm transition hover:bg-gray-50 hover:shadow-md"
          >
            <h2 className="font-medium">{doc.originalName}</h2>

            <p className="text-sm text-gray-500">
              Status:{" "}
              <span className="font-semibold">{doc.status}</span>
            </p>

            {doc.status === "PROCESSED" && doc.summary && (
              <SummaryCard summary={JSON.parse(doc.summary)} />
            )}
          </div>
        ))}
      </div>

      {/* Magic Write Modal */}
      <MagicWriteModal
        open={openMagic}
        onClose={() => setOpenMagic(false)}
      />
    </div>
  );
};

export default Dashboard;
