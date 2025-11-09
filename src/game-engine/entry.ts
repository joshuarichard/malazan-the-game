import * as dotenv from 'dotenv';

import connectDB from 'database';
import { generateStory } from './generateStory';
import { getUserInput } from 'utils/input'; // Import getUserInput
import Story, { IStory } from '@models/Story';
import { startGameLoop } from './gameLoop'; // Import startGameLoop

dotenv.config();

const startGame = async () => {
  await connectDB();
  console.log('Game engine started. Database connected.');

  let currentStory: IStory | null = null; // Explicitly type currentStory

  const choice = getUserInput(
    'Do you want to (1) generate a new story or (2) load an existing story?: '
  );

  if (choice === '1') {
    try {
      const newStory = await generateStory();
      currentStory = newStory;
    } catch (error) {
      console.error('Failed to generate a new story.', error);
    }
  } else if (choice === '2') {
    const stories = (await Story.find({})) as IStory[];
    if (stories.length === 0) {
      console.log('No stories found. Please generate a new story.');
      try {
        const newStory = await generateStory();
        currentStory = newStory;
      } catch (error) {
        console.error('Failed to generate a new story.', error);
      }
    } else {
      console.log('Available stories:');
      stories.forEach((s, index) => {
        console.log(
          `${index + 1}. Prompt: "${s.prompt.substring(0, 50)}..." (ID: ${
            s._id
          })`
        );
      });

      const storyChoice = getUserInput(
        'Enter the number or ID of the story to load:'
      );
      let selectedStory = null;

      if (!isNaN(parseInt(storyChoice))) {
        const index = parseInt(storyChoice) - 1;
        if (index >= 0 && index < stories.length) {
          selectedStory = stories[index];
        }
      } else {
        selectedStory = stories.find((s) => s._id.toString() === storyChoice);
      }

      if (selectedStory) {
        currentStory = selectedStory;
        console.log(
          `Story "${currentStory.prompt.substring(0, 50)}..." loaded.`
        );
      } else {
        console.log('Invalid selection. Generating a new story instead.');
        try {
          const newStory = await generateStory();
          currentStory = newStory;
        } catch (error) {
          console.error('Failed to generate a new story.', error);
        }
      }
    }
  } else {
    console.log('Invalid choice. Generating a new story by default.');
    try {
      const newStory = await generateStory();
      currentStory = newStory;
    } catch (error) {
      console.error('Failed to generate a new story.', error);
    }
  }

  if (currentStory) {
    await startGameLoop(currentStory);
  } else {
    console.log('No story loaded or generated. Exiting game.');
  }

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
