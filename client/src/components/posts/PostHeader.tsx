import { FC } from "react";
import { Link } from "react-router-dom";
import { PostDropdownMenu } from "./PostDropDownMenu";
import { Post } from "@/types/post";

type PostHeaderProps = {
  username: string;
  avatarUrl?: string;
  post: Post;
};

export const PostHeader: FC<PostHeaderProps> = ({
  username,
  avatarUrl,
  post
}) => {
  return (
    <div className="flex items-center justify-between p-4">
      <Link to={`/profile/${username}`}>
        <div className="flex items-center p-4">
          <img
            src={
              avatarUrl ||
              "https://ui-avatars.com/api/?name=User&background=ddd&color=333&size=200"
            }
            alt={username}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="ml-3 font-medium">{username}</span>
        </div>
      </Link>

      <PostDropdownMenu post={post} />
    </div>
  );
};
