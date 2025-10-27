import connectDB from 'database';
import Player from 'models/Player';
import Story from 'models/Story'; // Import Story model
import { createSword, createShield, EquipableSlots, ItemTypes } from 'items';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';
import * as fs from 'fs'; // Import fs module

dotenv.config(); // Load environment variables

const startGame = async () => {
  await connectDB();
  console.log('Game engine started. Database connected.');

  const args = process.argv.slice(2);
  const doGenerateNewStory = args.includes('--generate-story');

  if (doGenerateNewStory) {
    // Read story prompt from file
    const storyPromptFilePath = 'story_prompt.txt';
    let storyPromptFromFile: string;
    try {
      storyPromptFromFile = fs.readFileSync(storyPromptFilePath, 'utf8').trim();
    } catch (error: any) {
      console.error(
        `Error reading story prompt file ${storyPromptFilePath}:`,
        error.message
      );
      process.exit(1);
    }

    // Initialize Google Gemini
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
      console.error('GEMINI_API_KEY is not set in environment variables.');
      process.exit(1);
    }
    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    console.log(
      `Generating story for prompt with prompt found at ${storyPromptFilePath}`
    );
    try {
      const result = await model.generateContent(storyPromptFromFile);
      const response = result.response;
      const generatedText = response.text();

      const newStory = new Story({
        prompt: storyPromptFromFile,
        generatedText: generatedText,
      });
      await newStory.save();

      console.log('Generated story saved to MongoDB:', newStory._id);
      console.log('Story content:\n', generatedText);
    } catch (error: any) {
      console.error('Error generating or saving story:', error.message);
    }
  } else {
    console.log(
      'Story generation skipped. Pass --generate-story to generate a story.'
    );
  }

  // start by prompting the user to load their character or create a new one
};

startGame();
