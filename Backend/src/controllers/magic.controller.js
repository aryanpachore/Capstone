import * as aiService from "../services/ai.service.js";

export const rewriteText = async (req, res) => {
  try {
    const { text, instruction } = req.body;
    const rewritten = await aiService.rewriteText(text, instruction);
    res.json({ rewritten });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const generateClause = async (req, res) => {
  try {
    const { clauseType, context } = req.body;
    const clause = await aiService.generateClause(clauseType, context);
    res.json({ clause });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const analyzeDocument = async (req, res) => {
  try {
    const { documentId } = req.body;
    const analysis = await aiService.analyzeDocument(documentId);
    res.json({ analysis });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
