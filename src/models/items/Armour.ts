import mongoose, { Schema } from 'mongoose';
import EquipableItem, { IEquipableItem } from './EquipableItem';
import { ItemTypes } from '@items/types';

export interface IArmour extends IEquipableItem {
  itemType: ItemTypes.Armour;
  baseDefense: number;
}

const ArmourSchema: Schema = new Schema({
  baseDefense: { type: Number, required: true, default: 0 },
});

const Armour = EquipableItem.discriminator<IArmour>('Armour', ArmourSchema);
export default Armour;
