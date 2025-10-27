import mongoose, { Schema } from 'mongoose';
import Item, { IItem } from './Item'; // Import Item directly
import { ItemTypes, EquipableSlots } from '@items/types'; // Need EquipableSlots for the schema

export interface IWeapon extends IItem {
  // Extend IItem directly
  itemType: ItemTypes.Weapon;
  equipmentSlot: EquipableSlots; // Add equipmentSlot here
  baseDamage: number;
}

const WeaponSchema: Schema = new Schema({
  equipmentSlot: {
    // Add equipmentSlot to the schema
    type: String,
    enum: Object.values(EquipableSlots),
    required: true,
  },
  baseDamage: { type: Number, required: true, default: 0 },
});

const Weapon = Item.discriminator<IWeapon>('Weapon', WeaponSchema); // Discriminator of Item
export default Weapon;
