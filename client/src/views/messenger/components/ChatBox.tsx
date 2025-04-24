import { useEffect, useState } from "react";
import { sendMessage, listenForMessages, socket } from "@/lib/socket";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage
} from "@/components/ui/chat/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { messengerApi, useGetChatHistoryQuery } from "@/services/messengerApi";
import { useAppDispatch } from "@/store/redux-hooks/useAppDispatch";

interface Message {
  senderId: string;
  receiverId: string;
  content: string;
}

interface User {
  id: string;
  username: string;
  avatarUrl?: string;
}

interface ChatBoxProps {
  currentUser: User;
  selectedUser: User;
}

export const ChatBox = ({ currentUser, selectedUser }: ChatBoxProps) => {
  const {
    id: currentUserId,
    username: currentUsername,
    avatarUrl: currentAvatar
  } = currentUser;
  const {
    id: receiverId,
    username: receiverUsername,
    avatarUrl: receiverAvatar
  } = selectedUser;

  const chatId = [currentUserId, receiverId].sort().join("_");

  const {
    data: chatHistory,
    isLoading,
    refetch
  } = useGetChatHistoryQuery(chatId);
  const dispatch = useAppDispatch();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (chatHistory) {
      setMessages(chatHistory);
    }
  }, [chatHistory]);

  useEffect(() => {
    const handler = (message: Message) => {
      setMessages((prev) => {
        const isDuplicate = prev.some(
          (m) =>
            m.senderId === message.senderId &&
            m.receiverId === message.receiverId &&
            m.content === message.content
        );
        return isDuplicate ? prev : [...prev, message];
      });
    };

    listenForMessages(handler);

    return () => {
      if (socket) socket.off("message:receive", handler);
    };
  }, [currentUserId, receiverId]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const newMessage: Message = {
      senderId: currentUserId,
      receiverId,
      content: trimmed
    };

    sendMessage(newMessage);
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    dispatch(
      messengerApi.util.invalidateTags([{ type: "ChatHistory", id: chatId }])
    );
    refetch();
  };

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-lg font-semibold ml-4 mb-2">{receiverUsername}</h1>

      <div className="flex-1 overflow-y-auto border rounded-xl p-4 shadow-sm space-y-3">
        {isLoading ? (
          <p>Loading chat...</p>
        ) : (
          <ChatMessageList>
            {messages.map((msg, idx) => {
              const isMe = msg.senderId === currentUserId;
              return (
                <ChatBubble key={idx} variant={isMe ? "sent" : "received"}>
                  <ChatBubbleAvatar
                    fallback={
                      isMe
                        ? currentUsername.slice(0, 2).toUpperCase()
                        : receiverUsername.slice(0, 2).toUpperCase()
                    }
                    src={isMe ? currentAvatar : receiverAvatar}
                  />
                  <ChatBubbleMessage variant={isMe ? "sent" : "received"}>
                    {msg.content}
                  </ChatBubbleMessage>
                </ChatBubble>
              );
            })}
          </ChatMessageList>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <textarea
          placeholder="Type your message here..."
          className="flex-1 border p-2 rounded-md resize-none"
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};
