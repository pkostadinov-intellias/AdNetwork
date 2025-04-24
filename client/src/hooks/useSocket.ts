import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  connectSocket,
  disconnectSocket,
  listenForMessages
} from "@/lib/socket";
import { RootState } from "@/store/store";

export const useSocket = () => {
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  useEffect(() => {
    if (userId) {
      connectSocket(userId);

      listenForMessages((msg) => {
        console.log("New message received:", msg);
      });
    }

    return () => {
      disconnectSocket();
    };
  }, [userId]);
};
