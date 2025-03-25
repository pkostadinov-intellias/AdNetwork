import { Camera } from "lucide-react";

interface ProfileCoverProps {
  coverUrl: string | null;
  coverPreview: string | null;
  onCoverChange: (previewUrl: string) => void;
}

const ProfileCover = ({
  coverUrl,
  coverPreview,
  onCoverChange
}: ProfileCoverProps) => {
  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onCoverChange(URL.createObjectURL(file));
    // TODO: Upload to backend
  };

  return (
    <div className="relative h-80 mb-4 rounded-lg overflow-hidden group">
      {coverPreview || coverUrl ? (
        <img
          src={coverPreview || coverUrl!}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-4xl">
          📷
        </div>
      )}
      <label className="absolute bottom-1 right-1 cursor-pointer bg-black text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
        <Camera size={16} />
        <input
          type="file"
          accept="image/*"
          onChange={handleCoverChange}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default ProfileCover;
