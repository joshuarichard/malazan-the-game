import mongoose, { Schema } from 'mongoose';
import Item, { IItem } from './Item';
import { ItemTypes } from '@items/types';

export interface IConsumable extends IItem {
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
);
export default Consumable;
