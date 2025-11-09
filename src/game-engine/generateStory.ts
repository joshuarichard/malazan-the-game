import { ChatSession, GenerativeModel } from '@google/generative-ai';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

import Story, { IStory } from '@models/Story';
import { parseTemplate, getUserInput, initializeGemini } from '../utils';
import { cleanChatHistory } from './gameLoop';

dotenv.config();

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

  const initialHistory = [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];

  const chat = model.startChat({
    history: cleanChatHistory(initialHistory),
  });

  return chat;
};

export const generateStory = async (): Promise<IStory | null> => {
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
    const newStory = new Story({
      prompt,
      story: await chat.getHistory(),
    });
    await newStory.save();
    return newStory;
  } catch (error: any) {
    console.error('Error generating or saving story:', error.message);
    return null;
  }
};
