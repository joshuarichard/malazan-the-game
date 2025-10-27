import mongoose, { Document, Schema } from 'mongoose';
import { ItemTypes, EquipableSlots } from '@items/types'; // Assuming types are still needed for enums

export interface IItem extends Document {
  uniqueId: string;
  name: string;
  itemType: ItemTypes;
  weight: number;
}

const ItemSchema: Schema = new Schema(
  {
    uniqueId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    itemType: { type: String, enum: Object.values(ItemTypes), required: true },
    weight: { type: Number, required: true, default: 0 },
  },
  { discriminatorKey: 'itemType', timestamps: true }
);

const Item = mongoose.model<IItem>('Item', ItemSchema);
export default Item;
