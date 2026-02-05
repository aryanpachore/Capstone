import api from "./axios";

// Get all documents of logged-in user
export const fetchDocuments = async () => {
  const response = await api.get("/documents");
  return response.data;
};

// Upload a PDF document
export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/documents/upload", formData);
  return response.data;
};
