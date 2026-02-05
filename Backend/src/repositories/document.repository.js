import Document from '../models/Document.js';

export const createDocument = async (docData) => {
  return await Document.create(docData);
};

export const findDocumentsByUser = async (userId) => {
  return await Document.findAll({ 
    where: { userId },
    order: [['createdAt', 'DESC']] // Newest first
  });
};

export const updateDocumentStatus = async (id, status, summary = null) => {
  const doc = await Document.findByPk(id);
  if (doc) {
    doc.status = status;
    if (summary) doc.summary = summary;
    await doc.save();
    return doc;
  }
  return null;
};