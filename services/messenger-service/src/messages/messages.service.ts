import { Message } from "../models/message.model";

export const getChatHistoryService = async (chatId: string) => {
  return await Message.find({ chatId }).sort({ createdAt: 1 }); // oldest to newest
};
