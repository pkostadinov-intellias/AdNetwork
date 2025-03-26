import { Camera } from "lucide-react";
import { useAssets } from "@/hooks/assets/useAssets";
import { AssetType } from "@/types/assets";

interface ProfileAvatarProps {
  alt: string;
  avatarUrl: string | null;
  canEdit: boolean;
}

export const ProfileAvatar = ({
  alt,
  avatarUrl,
  canEdit
}: ProfileAvatarProps) => {
  const { uploadAsset } = useAssets();

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await uploadAsset(file, AssetType.AVATAR);
    } catch (error) {
      console.error("Avatar upload failed", error);
    }
  };

  return (
    <div className="relative -mt-20 group">
      <img
        src={
          avatarUrl ||
          "https://ui-avatars.com/api/?name=User&background=ddd&color=333&size=200"
        }
        alt={alt}
        className="w-32 h-32 rounded-full object-cover border-4 border-white"
      />

      {canEdit && (
        <label className="absolute bottom-1 right-1 cursor-pointer bg-black text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Camera size={16} />
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
};
