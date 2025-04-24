import { Server as HttpServer } from "http";
import { Socket, Server as SocketServer } from "socket.io";
import { Message } from "./models/message.model";

export const initSocketServer = (httpServer: HttpServer) => {
  const io = new SocketServer(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket: Socket) => {
    const userId = socket.handshake.query.userId;

    if (typeof userId !== "string") return;

    socket.join(userId); // Each user joins their private room

    console.log(userId, "User connected");

    socket.on("message:send", async (message) => {
      const { receiverId, content } = message;

      const newMessage = {
        chatId: [userId, receiverId].sort().join("_"),
        senderId: userId,
        receiverId,
        content
      };

      await Message.create(newMessage);

      socket.to(receiverId).emit("message:receive", newMessage);
    });

    socket.on("disconnect", () => {
      console.log(`User ${userId} disconnected`);
    });
  });
};
