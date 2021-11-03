import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import merge from "lodash/merge";
import Image from "next/image";
import NextLink from "next/link";
import { Post } from "../utils/models";
import Markdown, { options } from "./Markdown";

const DEFAULT_IMAGE = "https://source.unsplash.com/random?water";

interface MainFeaturedPostProps {
  post: Post;
}

const customOptions = merge({}, options, {
  overrides: { p: { props: { variant: "h5" } } },
});

export default function MainFeaturedPost(props: MainFeaturedPostProps) {
  const { post } = props;

  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "grey.800",
        color: "#fff",
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
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: "relative",
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              {post.title}
            </Typography>
            <Typography
              variant="h5"
              color="inherit"
              sx={{
                maxHeight: "5.8rem",
                overflow: "hidden",
                maskImage:
                  "linear-gradient(rgba(0, 0, 0, 1.0) 3rem, transparent)",
              }}
            >
              <Markdown options={customOptions}>{post.body}</Markdown>
            </Typography>
            <NextLink href={`/posts/${post._id}`} passHref>
              <Link variant="subtitle1">Continue Reading...</Link>
            </NextLink>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}