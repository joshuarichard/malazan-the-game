import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';

export const initializeGemini = async (): Promise<GenerativeModel> => {
  const geminiApiKey = process.env.GEMINI_API_KEY;
  if (!geminiApiKey) {
    console.error('GEMINI_API_KEY is not set in environment variables.');
    process.exit(1);
  }
  const genAI = new GoogleGenerativeAI(geminiApiKey);
  return genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
};
