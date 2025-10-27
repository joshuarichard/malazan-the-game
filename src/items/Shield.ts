import { uuid } from 'uuidv4';
import { EquipableSlots, ItemTypes } from '@items/types';
import Armour, { IArmour } from '@models/items/Armour';

export const createShield = async (
  name: string,
  equipmentSlot: EquipableSlots,
  weight: number,
  baseDefense: number
): Promise<IArmour> => {
  const newShield = new Armour({
    uniqueId: uuid(),
    name,
    itemType: ItemTypes.Armour,
    equipmentSlot,
    weight,
    baseDefense,
  });
  await newShield.save();
  return newShield;
};

// Example usage (for testing purposes, can be removed later)
// createShield('Shield of the Fallen', EquipableSlots.OneHanded, 5, 10).then(shield => console.log('Created shield:', shield.name));
