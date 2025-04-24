import { io, Socket } from "socket.io-client";

export let socket: Socket | null = null;

const SOCKET_URL = import.meta.env.VITE_MESSENGER_API;

export const connectSocket = (userId: string) => {
  if (!userId) throw new Error("User ID is required to connect socket");

  socket = io(SOCKET_URL, {
    query: { userId },
    transports: ["websocket"]
  });

  socket.on("connect", () => {
    console.log("Connected to socket server");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from socket server");
  });
};

export const sendMessage = (message: {
  receiverId: string;
  content: string;
}) => {
  if (!socket) throw new Error("Socket is not connected");
  socket.emit("message:send", message);
};

export const listenForMessages = (cb: (message: any) => void) => {
  if (!socket) throw new Error("Socket is not connected");
  socket.on("message:receive", cb);
  console.log(cb, "cb");
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
