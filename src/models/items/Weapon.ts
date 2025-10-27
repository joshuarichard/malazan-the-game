import mongoose, { Schema } from 'mongoose';
import Item, { IItem } from './Item';
import { ItemTypes, EquipableSlots } from '@items/types';

export interface IWeapon extends IItem {
  itemType: ItemTypes.Weapon;
  equipmentSlot: EquipableSlots;
  baseDamage: number;
}

const WeaponSchema: Schema = new Schema({
  equipmentSlot: {
    type: String,
    enum: Object.values(EquipableSlots),
    required: true,
  },
  baseDamage: { type: Number, required: true, default: 0 },
});

const Weapon = Item.discriminator<IWeapon>('Weapon', WeaponSchema);
export default Weapon;
