import SellIcon from "@mui/icons-material/Sell";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import "highlight.js/styles/github.css";
import NextLink from "next/link";
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
      <Typography gutterBottom component="div">
        {post.tags.map((tag) => (
          <Chip
            key={tag}
            icon={<SellIcon fontSize="small" />}
            size="small"
            label={tag}
            sx={{ mr: 1 }}
            component={NextLink}
            href={`/posts/tags/${tag}`}
            clickable
          />
        ))}
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
