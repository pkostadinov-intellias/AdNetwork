import { Ellipsis, Pencil, Trash2, Repeat2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";
import { useAppSelector } from "@/store/redux-hooks/useAppSelector";
import { Post } from "@/types/post";
import { useDeletePostMutation } from "@/services/postApi";
import { useDialog } from "@/hooks/useDialog";
import { DialogType } from "@/types/dialog";

export const PostDropdownMenu = ({ post }: { post: Post }) => {
  const authUser = useAppSelector((state) => state.auth.user);
  const isOwner = authUser ? post.userId === authUser.id : false;
  const [deletePost] = useDeletePostMutation();
  const { openDialog } = useDialog();

  const handleDelete = async () => {
    await deletePost(post.id).unwrap();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis color="black" className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isOwner ? (
          <>
            <DropdownMenuItem
              onClick={() => openDialog(DialogType.EDIT_POST, post)}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit Post
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Post
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem>
            <Repeat2 className="mr-2 h-4 w-4" />
            Repost
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
