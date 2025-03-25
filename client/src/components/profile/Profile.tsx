import { useState } from "react";
import { useParams } from "react-router-dom";
import ProfileCover from "./ProfileCover";
import ProfileHeader from "./ProfileHeader";
import ProfilePosts from "./ProfilePosts";

function Profile() {
  const { username } = useParams();

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const profile = {
    username: username || "unknown",
    full_name: "Plamen Kostadinov",
    avatar_url: null,
    cover_url: null,
    role: "Creative Director",
    bio: "Passionate about creating impactful advertising campaigns",
    posts_count: 42,
    connections_count: 124,
    posts: [
      {
        id: "1",
        image_url:
          "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=400&fit=crop"
      },
      {
        id: "2",
        image_url:
          "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=400&fit=crop"
      },
      {
        id: "3",
        image_url:
          "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=400&fit=crop"
      }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto">
      <ProfileCover
        coverUrl={profile.cover_url}
        coverPreview={coverPreview}
        onCoverChange={(url) => setCoverPreview(url)}
      />

      <ProfileHeader
        fullName={profile.full_name}
        avatarUrl={profile.avatar_url}
        avatarPreview={avatarPreview}
        role={profile.role}
        bio={profile.bio}
        username={profile.username}
        postsCount={profile.posts_count}
        connectionsCount={profile.connections_count}
        onAvatarChange={(url) => setAvatarPreview(url)}
      />

      <ProfilePosts posts={profile.posts} />
    </div>
  );
}

export default Profile;
