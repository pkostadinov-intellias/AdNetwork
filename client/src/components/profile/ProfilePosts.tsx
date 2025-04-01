import { useGetPostsByUserIdQuery } from "@/services/postApi";

type Props = {
  userId: string;
};

export const ProfilePosts = ({ userId }: Props) => {
  const { data: posts = [], isLoading } = useGetPostsByUserIdQuery(userId);

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading posts...</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {posts.map((post) => (
        <img
          key={post.id}
          src={post.mediaUrl}
          alt="Post"
          className="w-full h-auto rounded-lg object-cover aspect-square"
        />
      ))}
    </div>
  );
};
