import { createShield, createSword, EquipableSlots } from '@items/index';

import Player from './Player';

export const runExamples = async () => {
  // Example: Create a new player
  try {
    const newPlayer = new Player({
      name: 'Hero',
      health: 100,
      mana: 50,
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
    const dragnipur = await createSword({
      name: 'Dragnipur',
      equipmentSlot: EquipableSlots.TwoHanded,
      weight: 3,
      baseDamage: 5,
    });
    console.log('Created sword:', dragnipur.name);
  } catch (error: any) {
    console.error('Error creating sword:', error.message);
  }

  // Example: Create a new shield
  try {
    const shieldOfTheFallen = await createShield({
      name: 'Shield of the Fallen',
      equipmentSlot: EquipableSlots.OneHanded,
      weight: 5,
      baseDefense: 10,
    });
    console.log('Created shield:', shieldOfTheFallen.name);
  } catch (error: any) {
    console.error('Error creating shield:', error.message);
  }
};
