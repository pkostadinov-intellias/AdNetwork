import { PostWithCommentsDialog } from "@/components/posts/PostWithCommentsDialog";
import EditProfileDialog from "@/components/profile/edit-profile/EditProfileDialog";
import { createContext, useContext, useState } from "react";

export enum DialogType {
  EDIT_PROFILE = "editProfile",
  POST_WITH_COMMENTS = "postWithComments"
}

interface DialogContextType {
  openDialog: (type: DialogType, data?: any) => void;
  closeDialog: () => void;
  type: DialogType | null;
  data: any;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [type, setType] = useState<DialogType | null>(null);
  const [data, setData] = useState<any>(null);

  const openDialog = (dialogType: DialogType, payload?: any) => {
    setType(dialogType);
    setData(payload);
  };

  const closeDialog = () => {
    setType(null);
    setData(null);
  };

  return (
    <DialogContext.Provider value={{ type, data, openDialog, closeDialog }}>
      {children}

      {type === DialogType.POST_WITH_COMMENTS && (
        <PostWithCommentsDialog postId={data.postId} userId={data.userId} />
      )}
      {type === DialogType.EDIT_PROFILE && <EditProfileDialog {...data} />}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error("useDialog must be used within DialogProvider");
  return ctx;
};
