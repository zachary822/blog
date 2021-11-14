import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useRouter } from "next/router";
import { Post } from "../utils/models";
import Markdown from "./Markdown";

interface FeaturedPostProps {
  post: Post;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const router = useRouter();

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea
        component="div"
        onClick={() => router.push(`/posts/${post._id}`)}
      >
        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {new Date(post.created).toLocaleString()}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                height: "2.8rem",
                overflow: "hidden",
                maskImage:
                  "linear-gradient(rgba(0, 0, 0, 1.0) 1.4rem, transparent)",
              }}
            >
              <Markdown>{post.body}</Markdown>
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography>
          </CardContent>
          <CardMedia sx={{ width: 160, display: { xs: "none", sm: "block" } }}>
            <div
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
              <Image
                unoptimized
                src={post.image!}
                alt={post.imageLabel}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </CardMedia>
        </Card>
      </CardActionArea>
    </Grid>
  );
}
