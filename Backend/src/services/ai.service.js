import fs from "fs";
import Groq from "groq-sdk";
import Document from "../models/Document.js";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

// Initialize Groq
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/* =====================================================
   1. Helper: Extract Text from PDF
===================================================== */
const extractTextFromPDF = async (filePath) => {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text;
};

/* =====================================================
   2. Helper: Generate Document Summary
===================================================== */
const generateSummary = async (text) => {
  const prompt = `
You are an expert legal AI assistant.
Analyze the following legal document text and provide a structured summary.

IMPORTANT:
- Output ONLY valid JSON
- Do NOT add markdown or explanations

Return JSON in this exact format:
{
  "title": "A short title for the document",
  "summary": "A concise paragraph explaining what this document is",
  "key_points": ["Point 1", "Point 2", "Point 3"],
  "risk_level": "Low | Medium | High"
}

Document Text (truncated):
"${text.substring(0, 25000)}"
`;

  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama-3.3-70b-versatile",
    temperature: 0.1,
  });

  return completion.choices[0]?.message?.content || "";
};

/* =====================================================
   3. MAIN: Process Uploaded Document
===================================================== */
export const processDocument = async (documentId, filePath) => {
  try {
    console.log(`🤖 AI processing started for document ${documentId}`);

    // Extract text
    const rawText = await extractTextFromPDF(filePath);

    await Document.update(
      { extractedText: rawText },
      { where: { id: documentId } }
    );

    // Generate summary
    const aiResponse = await generateSummary(rawText);

    const cleanJson = aiResponse.replace(/```json|```/g, "").trim();

    await Document.update(
      {
        summary: cleanJson,
        status: "PROCESSED",
      },
      { where: { id: documentId } }
    );

    console.log(`✅ AI processing completed for document ${documentId}`);
  } catch (error) {
    console.error(`❌ AI processing failed: ${error.message}`);

    await Document.update(
      { status: "ERROR" },
      { where: { id: documentId } }
    );
  }
};

/* =====================================================
   4. MAGIC WRITE: Rewrite Text
===================================================== */
export const rewriteText = async (text, instruction) => {
  if (!text || !instruction) {
    throw new Error("Text and instruction are required");
  }

  const prompt = `
You are a professional legal writing assistant.

Instruction:
"${instruction}"

Rewrite the following text accordingly.
Return ONLY the rewritten text.

Text:
"${text}"
`;

  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama-3.3-70b-versatile",
    temperature: 0.2,
  });

  return completion.choices[0]?.message?.content || "";
};

/* =====================================================
   5. MAGIC WRITE: Generate Legal Clause
===================================================== */
export const generateClause = async (clauseType, context) => {
  if (!clauseType || !context) {
    throw new Error("Clause type and context are required");
  }

  const prompt = `
You are an expert legal AI.

Draft a professional "${clauseType}" clause based on the context below.
Return ONLY the clause text.

Context:
"${context}"
`;

  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama-3.3-70b-versatile",
    temperature: 0.2,
  });

  return completion.choices[0]?.message?.content || "";
};

/* =====================================================
   6. MAGIC WRITE: Analyze Document Risks
===================================================== */
export const analyzeDocument = async (documentId) => {
  const document = await Document.findByPk(documentId);

  if (!document || !document.extractedText) {
    throw new Error("Document not found or not processed");
  }

  const prompt = `
Analyze the following legal document and identify potential risks.

Return ONLY valid JSON in this format:
[
  {
    "severity": "Low | Medium | High",
    "issue": "Description of the issue",
    "suggestion": "Recommended mitigation"
  }
]

Document Text:
"${document.extractedText.substring(0, 20000)}"
`;

  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama-3.3-70b-versatile",
    temperature: 0.1,
  });

  const raw = completion.choices[0]?.message?.content || "[]";

  return JSON.parse(raw.replace(/```json|```/g, "").trim());
};
