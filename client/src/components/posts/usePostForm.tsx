import { useDialog } from "@/hooks/useDialog";
import {
  useCreatePostMutation,
  useUpdatePostMutation
} from "@/services/postApi";
import { PostVisibility } from "@/types/post";
import { useState } from "react";

export const getVisibilityLabel = (v: PostVisibility) => {
  switch (v) {
    case PostVisibility.PUBLIC:
      return "Public";
    case PostVisibility.CONNECTIONS:
      return "Connections";
    case PostVisibility.PRIVATE:
      return "Private";
    default:
      return v;
  }
};

export const usePostForm = ({
  type,
  initialData,
  onSuccess
}: {
  type: "create" | "edit";
  initialData?: {
    id?: string;
    content?: string;
    visibility?: PostVisibility;
    mediaUrl?: string;
  };
  onSuccess?: () => void;
}) => {
  const [content, setContent] = useState(initialData?.content || "");
  const [visibility, setVisibility] = useState<PostVisibility>(
    initialData?.visibility || PostVisibility.PUBLIC
  );

  const { closeDialog } = useDialog();

  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    type === "create" ? null : initialData?.mediaUrl || null
  );

  const [createPost, { isLoading: isCreating }] = useCreatePostMutation();
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

  const isLoading = isCreating || isUpdating;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "edit") return;
    const file = e.target.files?.[0];
    if (!file) return;
    setMediaFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!content.trim()) return;

    try {
      if (type === "create") {
        const formData = new FormData();
        formData.append("content", content);
        formData.append("visibility", visibility);
        if (mediaFile) {
          formData.append("file", mediaFile);
        }
        await createPost(formData).unwrap();

        setContent("");
        setVisibility(PostVisibility.PUBLIC);
        setMediaFile(null);
        setPreviewUrl(null);
      } else if (type === "edit" && initialData?.id) {
        const data = {
          content,
          visibility
        };
        await updatePost({ id: initialData.id, data }).unwrap();
        closeDialog();
      }

      onSuccess?.();
    } catch (err) {
      console.error("Failed to submit post:", err);
    }
  };

  return {
    type,
    content,
    setContent,
    visibility,
    setVisibility,
    previewUrl,
    handleImageChange,
    handleSubmit,
    isLoading
  };
};
