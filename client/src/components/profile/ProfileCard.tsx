import { Link } from "react-router-dom";

function ProfileCard() {
  const profile = {
    username: "p_kostadinow",
    full_name: "Plamen Kostadinov",
    avatar_url:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    role: "Creative Director",
    connections_count: 124,
    posts_count: 42
  };

  return (
    <div
      className={`hidden lg:block w-80 sticky top-6 mr-4 bg-white rounded-lg border border-gray-200 overflow-hidden`}
    >
      <div className="flex flex-col items-center p-6">
        <Link to={`/profile/${profile.username}`}>
          <img
            src={profile.avatar_url}
            alt={profile.full_name}
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
        </Link>

        <Link to={`/profile/${profile.username}`}>
          <h2 className="text-xl font-bold text-center mb-1">
            {profile.full_name}
          </h2>
        </Link>

        <p className="text-gray-600 text-sm mb-4">@{profile.username}</p>
        <p className="text-gray-700 text-sm mb-6">{profile.role}</p>

        <div className="flex justify-center gap-8 w-full border-t border-gray-100 pt-4">
          <div className="text-center">
            <p className="font-bold text-lg">{profile.posts_count}</p>
            <p className="text-gray-600 text-sm">Posts</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-lg">{profile.connections_count}</p>
            <p className="text-gray-600 text-sm">Connections</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
