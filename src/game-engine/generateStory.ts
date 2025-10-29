import {
  ChatSession,
  GenerativeModel,
  GoogleGenerativeAI,
} from '@google/generative-ai';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

import Story from '@models/Story';
import { parseTemplate } from 'utils/templateParser'; // Import the template parser
import { getUserInput } from 'utils/input';

dotenv.config();

const initializeGemini = async (): Promise<GenerativeModel> => {
  const geminiApiKey = process.env.GEMINI_API_KEY;
  if (!geminiApiKey) {
    console.error('GEMINI_API_KEY is not set in environment variables.');
    process.exit(1);
  }

  const genAI = new GoogleGenerativeAI(geminiApiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  return model;
};

const getPromptFromFile = (
  filePath: string,
  context?: Record<string, any>
): string => {
  let rawPrompt: string;
  try {
    rawPrompt = fs.readFileSync(filePath, 'utf8').trim();
  } catch (error: any) {
    console.error(
      `Error reading story prompt file ${filePath}:`,
      error.message
    );
    process.exit(1);
  }

  const parsedPrompt = parseTemplate(rawPrompt, context || {});

  return parsedPrompt;
};

const initializeChat = (model: GenerativeModel): ChatSession => {
  const prompt = getPromptFromFile('./prompts/opening_chat.txt');

  console.log('Generating story with opening chat..');

  const chat = model.startChat({
    history: [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ],
  });

  return chat;
};

export const generateStory = async () => {
  try {
    const model = await initializeGemini();
    const chat = initializeChat(model);

    const playerDesc = getUserInput('Describe your character.');
    const prompt = getPromptFromFile('./prompts/story_prompt.txt', {
      playerDesc,
    });

    console.log("Sending Gemini a prompt with the user's self description");

    const result = await chat.sendMessage(prompt);
    const response = result.response;
    const story = response.text();

    const newStory = new Story({
      prompt,
      story,
    });
    await newStory.save();
  } catch (error: any) {
    console.error('Error generating or saving story:', error.message);
  }
};
