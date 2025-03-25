import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Settings, Camera } from "lucide-react";

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

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarPreview(URL.createObjectURL(file));

    // TODO: Upload to backend using FormData
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCoverPreview(URL.createObjectURL(file));

    // TODO: Upload to backend using FormData
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Cover Image */}
      <div className="relative h-80 mb-4 rounded-lg overflow-hidden group">
        {coverPreview || profile.cover_url ? (
          <img
            src={coverPreview || profile.cover_url!}
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

      {/* Profile Header */}
      <div className="flex items-start gap-8 mb-8">
        <div className="relative -mt-20 group">
          {avatarPreview || profile.avatar_url ? (
            <img
              src={avatarPreview || profile.avatar_url!}
              alt={profile.full_name}
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
            <h1 className="text-2xl font-semibold">{profile.full_name}</h1>
            <button className="px-4 py-1.5 bg-gray-100 rounded-lg font-medium">
              Edit Profile
            </button>
            <button>
              <Settings size={24} />
            </button>
          </div>

          <div className="flex gap-8 mb-4">
            <span>
              <strong>{profile.posts_count}</strong> posts
            </span>
            <span>
              <strong>{profile.connections_count}</strong> connections
            </span>
          </div>

          <div>
            <p className="text-gray-600">@{profile.username}</p>
            <p className="text-gray-600">{profile.role}</p>
            {profile.bio && <p className="mt-1">{profile.bio}</p>}
          </div>
        </div>
      </div>

      {/* Profile Tabs */}
      <div className="border-t border-gray-200">
        <div className="flex justify-center gap-12">
          <button className="flex items-center gap-1 px-4 py-4 text-sm font-medium border-t border-black -mt-px">
            <Grid size={12} />
            POSTS
          </button>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-1">
        {profile.posts.map((post) => (
          <div key={post.id} className="aspect-square">
            <img
              src={post.image_url}
              alt="Post"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
