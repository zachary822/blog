import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { Post } from "../utils/models";

const DEFAULT_IMAGE = "https://source.unsplash.com/random?water";

interface MainFeaturedPostProps {
  post: Post;
}

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
        <Image
          layout="fill"
          src={post.image || DEFAULT_IMAGE}
          alt={post.imageLabel}
        />
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
            <Typography variant="h5" color="inherit" paragraph>
              {post.body.slice(0, 100)}
            </Typography>
            <Link variant="subtitle1" href="#">
              Continue Reading...
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
