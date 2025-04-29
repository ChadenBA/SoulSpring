// src/models/UserMessage.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IUserMessage extends Document {
  userId:  mongoose.Types.ObjectId;
  question: string;
  response: string;
  timestamp: Date;
}

const userMessageSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  question: { type: String, required: true },
  response: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const UserMessage = mongoose.model<IUserMessage>('UserMessage', userMessageSchema);

export default UserMessage;
