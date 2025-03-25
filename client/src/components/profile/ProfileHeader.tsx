import { Camera, Settings } from "lucide-react";

interface ProfileHeaderProps {
  fullName: string;
  avatarUrl: string | null;
  avatarPreview: string | null;
  username: string;
  role: string;
  bio: string;
  postsCount: number;
  connectionsCount: number;
  onAvatarChange: (previewUrl: string) => void;
}

const ProfileHeader = ({
  fullName,
  avatarUrl,
  avatarPreview,
  username,
  role,
  bio,
  postsCount,
  connectionsCount,
  onAvatarChange
}: ProfileHeaderProps) => {
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onAvatarChange(URL.createObjectURL(file));
    // TODO: Upload to backend
  };

  return (
    <div className="flex items-start gap-8 mb-8">
      <div className="relative -mt-20 group">
        {avatarPreview || avatarUrl ? (
          <img
            src={avatarPreview || avatarUrl!}
            alt={fullName}
            className="w-32 h-32 rounded-full object-cover border-4 border-white"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-4xl border-4 border-white">
            👤
          </div>
        )}
        <label className="absolute bottom-1 right-1 cursor-pointer bg-black text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Camera size={16} />
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </label>
      </div>
      <div className="flex-1 pt-4">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-2xl font-semibold">{fullName}</h1>
          <button className="px-4 py-1.5 bg-gray-100 rounded-lg font-medium">
            Edit Profile
          </button>
          <button>
            <Settings size={24} />
          </button>
        </div>

        <div className="flex gap-8 mb-4">
          <span>
            <strong>{postsCount}</strong> posts
          </span>
          <span>
            <strong>{connectionsCount}</strong> connections
          </span>
        </div>

        <div>
          <p className="text-gray-600">@{username}</p>
          <p className="text-gray-600">{role}</p>
          {bio && <p className="mt-1">{bio}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
