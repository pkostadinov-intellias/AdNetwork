import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  chatId: string;
  senderId: string;
  receiverId: string;
  content: string;
}

const messageSchema = new Schema<IMessage>(
  {
    chatId: {
      type: String,
      required: true,
      index: true
    },
    senderId: {
      type: String,
      required: true
    },
    receiverId: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false
  }
);

export const Message = mongoose.model<IMessage>("Message", messageSchema);
