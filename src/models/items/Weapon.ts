import mongoose, { Schema } from 'mongoose';
import EquipableItem, { IEquipableItem } from './EquipableItem';
import { ItemTypes } from '@items/types';

export interface IWeapon extends IEquipableItem {
  itemType: ItemTypes.Weapon;
  baseDamage: number;
}

const WeaponSchema: Schema = new Schema({
  baseDamage: { type: Number, required: true, default: 0 },
});

const Weapon = EquipableItem.discriminator<IWeapon>('Weapon', WeaponSchema);
export default Weapon;
