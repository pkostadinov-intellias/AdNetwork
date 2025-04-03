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

export const usePostForm = ({ type, initialData, onSuccess }) => {
  const [content, setContent] = useState(initialData?.content || "");
  const [visibility, setVisibility] = useState<PostVisibility>(
    initialData?.visibility || "public"
  );

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

    const formData = new FormData();
    formData.append("content", content);
    formData.append("visibility", visibility);
    if (type === "create" && mediaFile) {
      formData.append("file", mediaFile);
    }

    try {
      if (type === "create") {
        await createPost(formData).unwrap();
      } else if (type === "edit" && initialData?.id) {
        await updatePost({ id: initialData.id, data: formData }).unwrap();
      }

      // Reset only after create
      if (type === "create") {
        setContent("");
        setVisibility("public");
        setMediaFile(null);
        setPreviewUrl(null);
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
