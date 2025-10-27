import mongoose, { Schema } from 'mongoose';
import Item, { IItem } from './Item'; // Import Item directly
import { ItemTypes } from '@items/types';

export interface IConsumable extends IItem {
  // Extend IItem directly
  itemType: ItemTypes.Consumable;
  baseHealth: number;
  baseHarm: number;
}

const ConsumableSchema: Schema = new Schema({
  baseHealth: { type: Number, required: true, default: 0 },
  baseHarm: { type: Number, required: true, default: 0 },
});

const Consumable = Item.discriminator<IConsumable>(
  'Consumable',
  ConsumableSchema
); // Discriminator of Item
export default Consumable;
