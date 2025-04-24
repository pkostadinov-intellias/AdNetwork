import { Context } from "koa";
import createHttpError from "http-errors";
import { getChatHistoryService } from "./messages.service";

export const getChatHistory = async (ctx: Context) => {
  const chatId = ctx.params.chatId;

  if (!chatId) {
    throw createHttpError(400, "Chat ID is required");
  }

  const messages = await getChatHistoryService(chatId);

  ctx.body = messages;
};
