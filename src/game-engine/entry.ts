import * as dotenv from 'dotenv';

import connectDB from 'database';
import { generateStory } from './generateStory';
// import { getUserInput } from 'utils/input'; // Import getUserInput

dotenv.config();

const startGame = async () => {
  await connectDB();
  console.log('Game engine started. Database connected.');

  const args = process.argv.slice(2);
  // todo: put flags in their own file
  const doGenerateNewStory = args.includes('--generate-story');

  if (doGenerateNewStory) {
    await generateStory();
  } else {
    console.log(
      'Story generation skipped. Pass --generate-story to generate a story.'
    );
  }

  // load story from mongo

  // start by prompting the user to load their character or create a new one
  // load the story from the db
  // present them with the next phase of the story and a prompt for what they would like to do
  // manage inventory
  // - show equipement
  // - show inventory
  // - equip item
  //
  // Demonstrate getUserInput
  // const userName = getUserInput('What is your name? ');
  // console.log(`Hello, ${userName}! Welcome to the game.`);
};

startGame();
