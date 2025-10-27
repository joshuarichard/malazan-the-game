import mongoose, { Document, Schema } from 'mongoose';

export interface IStory extends Document {
  prompt: string;
  generatedText: string;
  createdAt: Date;
}

const StorySchema: Schema = new Schema(
  {
    prompt: { type: String, required: true },
    generatedText: { type: String, required: true },
  },
  { timestamps: true }
);

const Story = mongoose.model<IStory>('Story', StorySchema);
export default Story;
