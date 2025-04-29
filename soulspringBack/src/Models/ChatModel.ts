// models/message.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IChat extends Document {
  senderModel: "User" | "Professional"; // could be either
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  receiverModel: "User" | "Professional"; // just in case Pro replies to User
  content: string;
  replyTo?: mongoose.Types.ObjectId; // to link replies
  createdAt: Date;
  read: boolean;
}

const ChatSchema = new Schema<IChat>(
  {
    sender: { type: Schema.Types.ObjectId, required: true, refPath: "senderModel" },
    senderModel: { type: String, required: true, enum: ["User", "Professional"] },

    receiver: { type: Schema.Types.ObjectId, required: true, refPath: "receiverModel" },
    receiverModel: { type: String, required: true, enum: ["User", "Professional"] },

    content: { type: String, required: true },
    replyTo: { type: Schema.Types.ObjectId, ref: "Message", default: null },

    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Chat = mongoose.model<IChat>("Chat", ChatSchema);
