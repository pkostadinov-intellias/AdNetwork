import { useParams } from "react-router-dom";
import ProfileCover from "./ProfileCover";
import ProfileHeader from "./ProfileHeader";
import ProfilePosts from "./ProfilePosts";
import { useGetUserByUsernameQuery } from "@/services/profileApi";

export const Profile = () => {
  const { username } = useParams();

  const {
    data: profile,
    isLoading,
    isError
  } = useGetUserByUsernameQuery(username!);

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
      <ProfileCover coverUrl={profile.coverImageUrl} />
      <ProfileHeader
        fullName={profile.fullName}
        avatarUrl={profile.avatarUrl}
        role={profile.profession || profile.role}
        bio={profile.biography}
        username={profile.username}
        postsCount={profile.posts}
        connectionsCount={profile.connections}
      />
      <ProfilePosts posts={[]} />
    </div>
  );
};
