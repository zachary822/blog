import Typography from "@mui/material/Typography";
import "highlight.js/styles/github.css";
import { Post as PostModel } from "../utils/models";
import Markdown from "./Markdown";

interface PostProps {
  post: PostModel;
}

const Post = ({ post }: PostProps) => {
  return (
    <div className="markdown">
      <Typography gutterBottom variant="h4" component="h1">
        {post.title}
      </Typography>
      <Typography gutterBottom variant="caption" paragraph>
        Created: {new Date(post.created).toLocaleString()} (Last updated:{" "}
        {new Date(post.updated).toLocaleString()})
      </Typography>
      <Markdown body={post.body} />
    </div>
  );
};

export default Post;
