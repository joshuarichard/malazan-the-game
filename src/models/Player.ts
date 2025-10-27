import mongoose, { Document, Schema } from 'mongoose';

export interface IPlayer extends Document {
  name: string;
  health: number;
  level: number;
  experience: number;
  inventory: string[]; // Placeholder for item IDs or references
  equipment: {
    weapon: string | null;
    shield: string | null;
    armor: string | null;
  };
  position: {
    x: number;
    y: number;
    z: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const PlayerSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    health: { type: Number, required: true, default: 100 },
    level: { type: Number, required: true, default: 1 },
    experience: { type: Number, required: true, default: 0 },
    inventory: [{ type: String }],
    equipment: {
      weapon: { type: String, default: null },
      shield: { type: String, default: null },
      armor: { type: String, default: null },
    },
    position: {
      x: { type: Number, required: true, default: 0 },
      y: { type: Number, required: true, default: 0 },
      z: { type: Number, required: true, default: 0 },
    },
  },
  { timestamps: true }
);

const Player = mongoose.model<IPlayer>('Player', PlayerSchema);
export default Player;
