import mongoose, { Schema } from 'mongoose';
import Item, { IItem } from './Item'; // Import Item directly
import { ItemTypes, EquipableSlots } from '@items/types'; // Need EquipableSlots for the schema

export interface IArmour extends IItem {
  // Extend IItem directly
  itemType: ItemTypes.Armour;
  equipmentSlot: EquipableSlots; // Add equipmentSlot here
  baseDefense: number;
}

const ArmourSchema: Schema = new Schema({
  equipmentSlot: {
    // Add equipmentSlot to the schema
    type: String,
    enum: Object.values(EquipableSlots),
    required: true,
  },
  baseDefense: { type: Number, required: true, default: 0 },
});

const Armour = Item.discriminator<IArmour>('Armour', ArmourSchema); // Discriminator of Item
export default Armour;
