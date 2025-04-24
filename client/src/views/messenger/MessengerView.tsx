import { SidebarLayout } from "@/layouts/SidebarLayout";
import { ChatBox } from "./components/ChatBox";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { useGetAllUsersQuery } from "@/services/profileApi";

const MessengerView = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const { data: users, isLoading } = useGetAllUsersQuery("");
  const [selectedUser, setSelectedUser] = useState();

  if (!currentUser) {
    return <p className="text-center mt-10">Loading user...</p>;
  }

  return (
    <SidebarLayout>
      <div className="flex h-[calc(100vh-6rem)]">
        <div className="w-64 border-r border-gray-200 bg-white px-4 py-6 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-6">Messenger</h1>
          <h2 className="text-lg font-semibold mb-4">Users</h2>

          {isLoading ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : (
            users
              ?.filter((user) => user?.id !== currentUser.id)
              .map((user) => (
                <button
                  key={user?.id}
                  className={cn(
                    "block w-full text-left px-4 py-2 rounded-lg transition-colors",
                    user.id === selectedUser?.id
                      ? "bg-gray-200 text-black font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                  onClick={() => setSelectedUser(user)}
                >
                  {user?.username}
                </button>
              ))
          )}
        </div>

        <div className="flex-1 p-4">
          {selectedUser?.id ? (
            <ChatBox currentUser={currentUser} selectedUser={selectedUser} />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select a user to start chatting
            </div>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
};

export default MessengerView;
