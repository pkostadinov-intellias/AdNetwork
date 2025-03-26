import { LogOut } from "lucide-react";
import { ProfileAvatar } from "./ProfileAvatar";
import { useLogoutMutation } from "@/services/authApi";
import { useAppDispatch } from "@/store/redux-hooks/useAppDispatch";
import { logoutUser } from "@/store/slices/authSlice";

interface ProfileHeaderProps {
  fullName: string;
  avatarUrl: string | null;
  username: string;
  role: string;
  bio: string;
  postsCount: number;
  connectionsCount: number;
}

const ProfileHeader = ({
  fullName,
  avatarUrl,
  username,
  role,
  bio,
  postsCount,
  connectionsCount
}: ProfileHeaderProps) => {
  const [logout] = useLogoutMutation();
  const dispach = useAppDispatch();

  const handleLogout = async () => {
    await logout();
    dispach(logoutUser());
  };

  return (
    <div className="flex items-start gap-8 mb-8">
      <ProfileAvatar alt={fullName} avatarUrl={avatarUrl} />
      <div className="flex-1 pt-4">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-2xl font-semibold">{fullName}</h1>
          <button className="px-4 py-1.5 bg-gray-100 rounded-lg font-medium">
            Edit Profile
          </button>
          <button onClick={handleLogout} className="cursor-pointer">
            <LogOut color="red" size={24} />
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
