import Groq from 'groq-sdk';
import * as chatRepository from '../repositories/chat.repository.js';
import Document from '../models/Document.js';
import dotenv from 'dotenv';

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const processChatQuery = async (userId, documentId, userQuestion) => {
  // 1. Fetch the Document content
  const doc = await Document.findByPk(documentId);
  
  if (!doc) {
    throw new Error('Document not found.');
  }
  
  // If text extraction hasn't finished yet, we can't chat
  if (!doc.extractedText) {
    throw new Error('Document is still processing. Please wait a moment.');
  }

  // 2. Save the User's Question to the DB
  await chatRepository.saveMessage({
    userId,
    documentId,
    role: 'user',
    content: userQuestion,
  });

  // 3. Prepare the AI Context
  // Llama 3 has a large context window, but we limit to ~30k chars to be safe/fast
  const context = doc.extractedText.substring(0, 30000);
  
  const systemPrompt = `
    You are an expert legal assistant. 
    Your task is to answer the user's question STRICTLY based on the provided document context below.
    
    Rules:
    1. If the answer is found in the text, explain it clearly.
    2. If the answer is NOT in the text, state: "I cannot find that information in this document."
    3. Do not make up facts not present in the document.
    
    Document Context:
    "${context}"
  `;

  // 4. Call Groq API
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userQuestion }
      ],
      model: "llama-3.3-70b-versatile", // Using the powerful new model
      temperature: 0.3, // Lower temperature = more factual answers
    });

    const aiAnswer = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate an answer.";

    // 5. Save the AI's Answer to the DB
    const aiMessage = await chatRepository.saveMessage({
      userId,
      documentId,
      role: 'ai',
      content: aiAnswer,
    });

    return aiMessage;

  } catch (error) {
    console.error("Groq API Error:", error);
    throw new Error("Failed to get response from AI service.");
  }
};

export const getHistory = async (documentId) => {
  return await chatRepository.getChatHistory(documentId);
};