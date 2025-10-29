import { EquipableSlots, ItemTypes } from '@items/types';
import Weapon, { IWeapon } from '@models/items/Weapon';

export const createSword = async ({
  name,
  equipmentSlot,
  weight,
  baseDamage,
}: {
  name: string;
  equipmentSlot: EquipableSlots;
  weight: number;
  baseDamage: number;
}): Promise<IWeapon> => {
  const newSword = new Weapon({
    name,
    itemType: ItemTypes.Weapon,
    equipmentSlot,
    weight,
    baseDamage,
  });
  await newSword.save();
  return newSword;
};

// Example usage (for testing purposes, can be removed later)
// createSword('Dragnipur', EquipableSlots.TwoHanded, 3, 5).then(sword => console.log('Created sword:', sword.name));
// createSword('Chance', EquipableSlots.OneHanded, 1, 2).then(sword => console.log('Created sword:', sword.name));
