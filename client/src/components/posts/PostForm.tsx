import { useRef, useState } from "react";
import { ImageIcon } from "lucide-react";
import ClipLoader from "react-spinners/ClipLoader";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useCreatePostMutation } from "@/services/postApi";

type PostVisibility = "public" | "connections" | "private.";

const CreatePostForm = () => {
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState<PostVisibility>("public");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [createPost, { isLoading }] = useCreatePostMutation();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    if (mediaFile) formData.append("file", mediaFile);

    try {
      await createPost(formData).unwrap();
      setContent("");
      setVisibility("public");
      setMediaFile(null);
      setPreviewUrl(null);
    } catch (err) {
      console.error("Failed to create post:", err);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="rounded-lg p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-8 text-center">Create a Post</h1>

      <Select
        value={visibility}
        onValueChange={(val) => setVisibility(val as PostVisibility)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Visibility" />
        </SelectTrigger>
        <SelectContent>
          {["public", "connections", "private"].map((v) => (
            <SelectItem key={v} value={v}>
              {v === "public"
                ? "Public"
                : v === "connections"
                ? "Connections"
                : "Private"}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div
        className="relative w-full aspect-video rounded-md overflow-hidden border cursor-pointer"
        onClick={triggerFileInput}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
            <ImageIcon size={32} />
            <span className="text-sm mt-2">Click to add an image</span>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />

        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center">
            <ClipLoader color="#000" size={30} />
          </div>
        )}
      </div>

      <Textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="resize-none"
      />

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-opacity-90 transition disabled:opacity-50"
      >
        {isLoading ? "Posting..." : "Post"}
      </button>
    </div>
  );
};

export default CreatePostForm;
