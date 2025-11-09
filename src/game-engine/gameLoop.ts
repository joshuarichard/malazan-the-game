import { ChatSession } from '@google/generative-ai';
import * as dotenv from 'dotenv';
import { getUserInput } from 'utils/input';
import { IStory } from '@models/Story';
import { Content } from '@google/generative-ai'; // Import Content for cleanChatHistory
import { initializeGemini } from 'utils/initializeGemini';

dotenv.config();

// Helper function to recursively remove _id and id from Mongoose sub-documents
export const cleanChatHistory = (history: Content[]): Content[] => {
  const propertiesToKeep = ['role', 'parts']; // Properties expected by Gemini API for Content
  const partPropertiesToKeep = ['text', 'inlineData']; // Properties expected by Gemini API for Part

  return history.map((content) => {
    // Convert Mongoose document to a plain object if it is one
    const plainContent = (content as any).toObject
      ? (content as any).toObject({ virtuals: true })
      : { ...content };

    const newContent: Content = { role: plainContent.role, parts: [] };

    // Copy only allowed properties for Content
    for (const prop of propertiesToKeep) {
      if (plainContent[prop] !== undefined) {
        (newContent as any)[prop] = plainContent[prop];
      }
    }

    newContent.parts = plainContent.parts.map((part: any) => {
      const newPart: any = {};
      // Copy only allowed properties for Part
      for (const prop of partPropertiesToKeep) {
        if (part[prop] !== undefined) {
          newPart[prop] = part[prop];
        }
      }
      return newPart;
    });
    return newContent;
  });
};

// Helper function to get the last model response from chat history
const getLastModelResponse = (chatHistory: IStory['story']): string | null => {
  const lastModelEntry = chatHistory
    .slice()
    .reverse()
    .find((entry) => entry.role === 'model');
  return lastModelEntry &&
    lastModelEntry.parts[0] &&
    'text' in lastModelEntry.parts[0]
    ? lastModelEntry.parts[0].text || null
    : null;
};

export const startGameLoop = async (story: IStory) => {
  console.log('\n--- Starting Game Loop ---');

  const model = await initializeGemini();
  let chat: ChatSession;

  // Clean history before initializing chat session
  const cleanedHistory = cleanChatHistory(story.story);

  // Initialize chat session with existing story history
  chat = model.startChat({
    history: cleanedHistory,
  });

  let currentStory = story;

  while (true) {
    const lastResponse = getLastModelResponse(currentStory.story);
    if (lastResponse) {
      console.log('\nModel:');
      console.log(lastResponse);
    } else {
      console.log('\nModel: (No previous response)');
    }

    const playerInput = getUserInput('\nYour action: ');

    // Send user input to Gemini
    const result = await chat.sendMessage(playerInput);
    const response = result.response;
    const modelResponseText = response.text();

    // Update story history with new user input and model response
    currentStory.story = await chat.getHistory();
    await currentStory.save();

    console.log('\n--- Story Updated ---');
  }
};
