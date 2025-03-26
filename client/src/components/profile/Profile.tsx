import { useParams } from "react-router-dom";
import ProfileCover from "./ProfileCover";
import ProfilePosts from "./ProfilePosts";
import { useGetUserByUsernameQuery } from "@/services/profileApi";
import { useAppSelector } from "@/store/redux-hooks/useAppSelector";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileInfoSection } from "./ProfileInfoSection";
import { useAppDispatch } from "@/store/redux-hooks/useAppDispatch";
import { useLogoutMutation } from "@/services/authApi";
import { logoutUser } from "@/store/slices/authSlice";

export const Profile = () => {
  const { username } = useParams();
  const [logout] = useLogoutMutation();
  const dispach = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);
  const isOwner = currentUser?.username === username;

  const {
    data: profile,
    isLoading,
    isError
  } = useGetUserByUsernameQuery(username!);

  const handleLogout = async () => {
    await logout();
    dispach(logoutUser());
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  if (isError || !profile) {
    return (
      <div className="text-center mt-10 text-red-500">Profile not found.</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <ProfileCover coverUrl={profile.coverImageUrl} canEdit={isOwner} />
      <div className="flex items-start gap-8 mb-8">
        <ProfileAvatar
          alt={profile.fullName}
          avatarUrl={profile.avatarUrl}
          canEdit={isOwner}
        />
        <ProfileInfoSection
          fullName={profile.fullName}
          username={username!}
          role={profile.role}
          bio={profile.biography}
          postsCount={profile.posts}
          connectionsCount={profile.connections}
          canEdit={isOwner}
          onLogout={handleLogout}
        />
      </div>
      <ProfilePosts posts={[]} />
    </div>
  );
};
