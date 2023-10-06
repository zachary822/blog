import SellIcon from "@mui/icons-material/Sell";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import "highlight.js/styles/github.css";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";
import { ComponentProps } from "react";
import { Post as PostModel } from "../utils/models";
import Markdown from "./Markdown";

type PostProps = {
  post: PostModel;
} & ComponentProps<typeof Box>;

const Post = ({ post, ...props }: PostProps) => {
  const { t } = useTranslation();

  return (
    <Box component="article" {...props}>
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
      <Typography
        gutterBottom
        variant="caption"
        paragraph
        suppressHydrationWarning
      >
        {t("Created")}: {new Date(post.created).toLocaleString()} (
        {t("Last updated")}: {new Date(post.updated).toLocaleString()})
      </Typography>
      <Markdown body={post.body} />
    </Box>
  );
};

export default Post;
