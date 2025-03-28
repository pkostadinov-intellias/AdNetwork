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
import { useDialog } from "@/contexts/DialogContext";

export const Profile = () => {
  const { username } = useParams();
  const { openDialog } = useDialog();
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

  const {
    fullName,
    username: profileUsername,
    profession,
    email,
    biography: bio,
    avatarUrl,
    coverImageUrl: coverUrl,
    role,
    posts,
    connections
  } = profile;

  const handleEditProfile = () => {
    openDialog("editProfile", {
      profileId: currentUser?.id,
      fullName,
      username,
      profession,
      email,
      bio,
      avatarUrl,
      coverUrl
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <ProfileCover
        alt={profile.fullName}
        coverUrl={profile.coverImageUrl}
        canEdit={isOwner}
      />
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 mb-8">
        <ProfileAvatar
          alt={profile.fullName}
          avatarUrl={profile.avatarUrl}
          canEdit={isOwner}
        />
        <ProfileInfoSection
          fullName={fullName}
          username={profileUsername}
          role={role}
          profession={profession}
          bio={bio}
          postsCount={posts}
          connectionsCount={connections}
          canEdit={isOwner}
          onEditProfile={handleEditProfile}
          onLogout={handleLogout}
        />
      </div>
      <ProfilePosts
        posts={[
          {
            id: "1",
            image_url:
              "https://ik.imagekit.io/4ywykjhlt/Screenshot%20at%20Mar%2026%2014-37-08.png?updatedAt=1743078999781"
          },
          {
            id: "2",
            image_url:
              "https://ik.imagekit.io/4ywykjhlt/default-image.jpg?updatedAt=1742225442531"
          },
          {
            id: "3",
            image_url:
              "https://ik.imagekit.io/4ywykjhlt/Screenshot_at_Mar_26_11-29-08_ZHJg6LucP.png?updatedAt=1742981362569"
          }
        ]}
      />
    </div>
  );
};
