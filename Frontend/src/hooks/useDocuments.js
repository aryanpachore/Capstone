import { useEffect, useState } from "react";
import { fetchDocuments, uploadDocument } from "../api/documents.api";

const POLL_INTERVAL = 4000;

export const useDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const loadDocuments = async () => {
    setLoading(true);
    try {
      const data = await fetchDocuments();
      setDocuments(data);
    } catch (err) {
      console.error("Failed to fetch documents", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file) => {
    setUploading(true);
    try {
      await uploadDocument(file);
      await loadDocuments();
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  // Poll if any document is pending
  useEffect(() => {
    loadDocuments();

    const interval = setInterval(() => {
      const hasPending = documents.some(
        (doc) => doc.status === "PENDING"
      );
      if (hasPending) {
        loadDocuments();
      }
    }, POLL_INTERVAL);

    return () => clearInterval(interval);
  }, [documents.length]);

  return {
    documents,
    loading,
    uploading,
    loadDocuments,
    handleUpload,
  };
};
