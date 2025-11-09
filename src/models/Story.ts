import mongoose, { Document, Schema, Types } from 'mongoose';
import { Content } from '@google/generative-ai'; // Import Content

export interface IStory extends Document {
  _id: Types.ObjectId;
  prompt: string;
  story: Content[]; // Use Content[] directly
  createdAt: Date;
}

const StorySchema: Schema = new Schema(
  {
    prompt: { type: String, required: true, unique: true },
    story: {
      type: [
        {
          role: { type: String, required: true },
          parts: [
            {
              text: { type: String },
            },
          ],
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

const Story = mongoose.model<IStory>('Story', StorySchema);
export default Story;
