import { Heart, MessageCircle } from "lucide-react";
import { Post } from "@/types/post";
import { useGetUserByIdQuery } from "@/services/profileApi";
import { useToggleLikeMutation } from "@/services/postApi";
import { useAppSelector } from "@/store/redux-hooks/useAppSelector";
import { DialogType, useDialog } from "@/contexts/DialogContext";
import { Link } from "react-router-dom";

type PostCardProps = {
  post: Post;
};

export const PostCard = ({ post }: PostCardProps) => {
  const { data: user } = useGetUserByIdQuery(post.userId);
  const { openDialog } = useDialog();
  const [toggleLike] = useToggleLikeMutation();

  const authUser = useAppSelector((state) => state.auth.user);
  const isLikedByMe = post.likes.some((like) => like.userId === authUser?.id);

  const handleComments = () => {
    openDialog(DialogType.POST_WITH_COMMENTS, {
      postId: post.id,
      userId: post.userId
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <Link to={`/profile/${user?.username}`}>
        <div className="flex items-center p-4">
          <img
            src={
              user?.avatarUrl ||
              "https://ui-avatars.com/api/?name=User&background=ddd&color=333&size=200"
            }
            alt={user?.username}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="ml-3 font-medium">{user?.username}</span>
        </div>
      </Link>

      {post.mediaUrl && (
        <img
          src={post.mediaUrl}
          alt="Post media"
          className="w-full aspect-square object-contain"
        />
      )}

      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => toggleLike(post.id)}
              className={`transition-colors ${
                isLikedByMe
                  ? "text-red-500"
                  : "text-gray-600 hover:text-red-500"
              }`}
            >
              <Heart size={24} fill={isLikedByMe ? "#ef4444" : "none"} />
            </button>

            <button onClick={handleComments} className="cursor-pointer">
              <MessageCircle size={24} />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="font-medium">{post.likes.length} likes</p>
          {post.content && (
            <p>
              <span className="font-medium">{user?.username}</span>{" "}
              {post.content}
            </p>
          )}
          <p className="text-gray-500 text-sm">
            View all {post.comments.length} comments
          </p>
        </div>
      </div>
    </div>
  );
};
