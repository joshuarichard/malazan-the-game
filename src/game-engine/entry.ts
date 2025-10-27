import connectDB from 'database';
import Player from 'models/Player';
import { createSword, createShield, EquipableSlots, ItemTypes } from 'items';

const startGame = async () => {
  await connectDB();
  console.log('Game engine started. Database connected.');

  // Example: Create a new player
  try {
    const newPlayer = new Player({
      name: 'Hero',
      health: 100,
      mana: 50, // Added mana as per Player model
      level: 1,
      experience: 0,
      inventory: [],
      equipment: {
        weapon: null,
        shield: null,
        armor: null,
      },
      position: { x: 0, y: 0, z: 0 },
    });
    await newPlayer.save();
    console.log('New player created:', newPlayer.name);
  } catch (error: any) {
    if (error.code === 11000) {
      console.log('Player "Hero" already exists. Skipping creation.');
    } else {
      console.error('Error creating player:', error.message);
    }
  }

  // Example: Create a new sword
  try {
    const dragnipur = await createSword(
      'Dragnipur',
      EquipableSlots.TwoHanded,
      3,
      5
    );
    console.log('Created sword:', dragnipur.name);
  } catch (error: any) {
    console.error('Error creating sword:', error.message);
  }

  // Example: Create a new shield
  try {
    const shieldOfTheFallen = await createShield(
      'Shield of the Fallen',
      EquipableSlots.OneHanded,
      5,
      10
    );
    console.log('Created shield:', shieldOfTheFallen.name);
  } catch (error: any) {
    console.error('Error creating shield:', error.message);
  }
};

startGame();
