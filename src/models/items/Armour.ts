import mongoose, { Schema } from 'mongoose';
import Item, { IItem } from './Item';
import { ItemTypes, EquipableSlots } from '@items/types';

export interface IArmour extends IItem {
  itemType: ItemTypes.Armour;
  equipmentSlot: EquipableSlots;
  baseDefense: number;
}

const ArmourSchema: Schema = new Schema({
  equipmentSlot: {
    type: String,
    enum: Object.values(EquipableSlots),
    required: true,
  },
  baseDefense: { type: Number, required: true, default: 0 },
});

const Armour = Item.discriminator<IArmour>('Armour', ArmourSchema);
export default Armour;
