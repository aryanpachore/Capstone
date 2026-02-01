import fs from 'fs';
import Groq from 'groq-sdk';
import Document from '../models/Document.js';
import { createRequire } from 'module';


const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

// Initialize Groq
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// 1. Helper: Extract Text from PDF
const extractTextFromPDF = async (filePath) => {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text; 
};

// 2. Helper: Summarize with Groq (Llama 3)
const generateSummary = async (text) => {
  const prompt = `
    You are an expert legal AI assistant. 
    Analyze the following legal document text and provide a structured summary.
    
    IMPORTANT: Output ONLY valid JSON. Do not add introductory text or markdown formatting like \`\`\`json.
    
    Structure your response with these exact keys:
    {
      "title": "A short title for the document",
      "summary": "A concise paragraph explaining what this document is",
      "key_points": ["Point 1", "Point 2", "Point 3"],
      "risk_level": "Low, Medium, or High"
    }

    Document Text (truncated):
    "${text.substring(0, 25000)}" 
  `;

  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama-3.3-70b-versatile", // Fast and smart model
    temperature: 0.1, // Low temperature for consistent JSON output
  });

  return completion.choices[0]?.message?.content || "";
};

// 3. Main Process Function
export const processDocument = async (documentId, filePath) => {
  try {
    console.log(`🤖 Starting AI processing (Groq) for Doc ID: ${documentId}`);

    // Step A: Extract
    const rawText = await extractTextFromPDF(filePath);
    console.log('✅ Text extracted successfully.');

    await Document.update(
      { extractedText: rawText },
      { where: { id: documentId } }
    );

    // Step B: Summarize
    const aiResponse = await generateSummary(rawText);
    
    // Cleanup: Sometimes models still add markdown, so we strip it just in case
    const cleanJson = aiResponse.replace(/```json|```/g, '').trim();

    // Step C: Save
    await Document.update(
      { 
        summary: cleanJson,
        status: 'PROCESSED' 
      },
      { where: { id: documentId } }
    );
    
    console.log(`✨ AI Processing Complete for Doc ID: ${documentId}`);

  } catch (error) {
    console.error(`❌ AI Processing Failed: ${error.message}`);
    await Document.update(
      { status: 'ERROR' },
      { where: { id: documentId } }
    );
  }
};