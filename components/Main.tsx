import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PostComponent from "./Post";
import type { Post } from "../utils/models";

interface MainProps {
  posts: ReadonlyArray<Post>;
  title: string;
}

export default function Main(props: MainProps) {
  const { posts, title } = props;

  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {posts.map((post) => (
        <PostComponent post={post} key={post._id} pt={3} />
      ))}
    </Grid>
  );
}
