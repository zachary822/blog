import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import merge from "lodash/merge";
import Image from "next/image";
import NextLink from "next/link";
import { Post } from "../utils/models";
import Markdown, { defaultComponents } from "./Markdown";

const DEFAULT_IMAGE = "https://source.unsplash.com/random?water";

interface MainFeaturedPostProps {
  post: Post;
}

const components = merge({}, defaultComponents, {
  p: (props: any) => <Typography {...props} component="p" variant="h5" />,
  pre: (props: any) => (
    <Box
      {...props}
      component="pre"
      sx={{ bgcolor: "transparent", m: 0, p: 0 }}
    />
  ),
  code: (props: any) => (
    <Box
      {...props}
      component="code"
      sx={{ bgcolor: "transparent", m: 0, p: 0 }}
    />
  ),
});

export default function MainFeaturedPost(props: MainFeaturedPostProps) {
  const { post } = props;

  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "grey.800",
        color: "#ffffff",
        mb: 4,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${post.image || DEFAULT_IMAGE})`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {
        <div style={{ display: "none" }}>
          <Image
            unoptimized
            layout="fill"
            src={post.image || DEFAULT_IMAGE}
            alt={post.imageLabel}
          />
        </div>
      }
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,.3)",
        }}
      />
      <Box
        sx={{
          position: "relative",
          p: { xs: 3, md: 6 },
          pr: { md: 0 },
        }}
      >
        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
          {post.title}
        </Typography>
        <Typography
          variant="h5"
          component="div"
          color="inherit"
          sx={{
            width: "100%",
            maxHeight: "5.8rem",
            overflow: "hidden",
            maskImage: "linear-gradient(rgba(0, 0, 0, 1.0) 3rem, transparent)",
          }}
        >
          <Markdown components={components} body={post.body} iframes={false} />
        </Typography>
        <NextLink href={`/posts/${post._id}`} passHref>
          <Link variant="subtitle1">Continue Reading...</Link>
        </NextLink>
      </Box>
    </Paper>
  );
}
