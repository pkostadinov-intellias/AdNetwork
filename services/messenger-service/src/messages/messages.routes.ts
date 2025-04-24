import Router from "koa-router";
import { getChatHistory } from "./messages.controller";

export const messagesRouter = new Router({ prefix: "/messages" });

messagesRouter.get("/chat-id/:chatId", getChatHistory);
