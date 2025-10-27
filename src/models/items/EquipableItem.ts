import mongoose, { Schema } from 'mongoose';
import Item, { IItem } from './Item';
import { EquipableSlots, ItemTypes } from '@items/types';

export interface IEquipableItem extends IItem {
  itemType: ItemTypes;
  equipmentSlot: EquipableSlots;
}

const EquipableItemSchema: Schema = new Schema({
  equipmentSlot: {
    type: String,
    enum: Object.values(EquipableSlots),
    required: true,
  },
});

const EquipableItem = Item.discriminator<IEquipableItem>(
  'EquipableItem',
  EquipableItemSchema
);
export default EquipableItem;
