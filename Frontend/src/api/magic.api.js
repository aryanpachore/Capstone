import api from "./axios";

export const rewriteText = async ({ text, instruction }) => {
  const res = await api.post("/magic/rewrite", {
    text,
    instruction,
  });
  return res.data;
};

export const generateClause = async ({ clauseType, context }) => {
  const res = await api.post("/magic/generate", {
    clauseType,
    context,
  });
  return res.data;
};

export const analyzeDocument = async (documentId) => {
  const res = await api.post("/magic/analyze", {
    documentId,
  });
  return res.data;
};
