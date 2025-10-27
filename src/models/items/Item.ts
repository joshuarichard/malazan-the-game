import mongoose, { Document, Schema } from 'mongoose';
import { ItemTypes } from '@items/types';

export interface IItem extends Document {
  name: string;
  itemType: ItemTypes;
  weight: number;
}

const ItemSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    itemType: { type: String, enum: Object.values(ItemTypes), required: true },
    weight: { type: Number, required: true, default: 0 },
  },
  { discriminatorKey: 'itemType', timestamps: true }
);

const Item = mongoose.model<IItem>('Item', ItemSchema);
export default Item;
