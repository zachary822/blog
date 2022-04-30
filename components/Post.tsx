import Typography from "@mui/material/Typography";
import { Post as PostModel } from "../utils/models";
import Markdown from "./Markdown";

interface PostProps {
  post: PostModel;
}

const Post = ({ post }: PostProps) => (
  <div className="markdown">
    <Typography gutterBottom variant="h4" component="h1">
      {post.title}
    </Typography>
    <Typography gutterBottom variant="caption" paragraph>
      {post.created}
    </Typography>
    <Markdown>{post.body}</Markdown>
  </div>
);

export default Post;