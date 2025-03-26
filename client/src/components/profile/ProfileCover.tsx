import { useAssets } from "@/hooks/assets/useAssets";
import { AssetType } from "@/types/assets";
import { Camera } from "lucide-react";

interface ProfileCoverProps {
  coverUrl: string | null;
  canEdit: boolean;
}

const ProfileCover = ({ coverUrl, canEdit }: ProfileCoverProps) => {
  const { uploadAsset } = useAssets();

  const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await uploadAsset(file, AssetType.COVER);
    } catch (error) {
      console.error("Cover upload failed", error);
    }
  };

  return (
    <div className="relative h-80 mb-4 rounded-lg overflow-hidden group">
      <img
        src={
          coverUrl! ||
          "https://ui-avatars.com/api/?name=User&background=ddd&color=333&size=200"
        }
        alt="Cover"
        className="w-full h-full object-cover"
      />

      {canEdit && (
        <label className="absolute bottom-1 right-1 cursor-pointer bg-black text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Camera size={16} />
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverChange}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
};

export default ProfileCover;
