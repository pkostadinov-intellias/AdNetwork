interface Post {
  id: string;
  image_url: string;
}

const ProfilePosts = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="border-t border-gray-200">
      <div className="grid grid-cols-3 gap-1">
        {posts.map((post) => (
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
};

export default ProfilePosts;
