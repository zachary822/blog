import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Markdown from "./Markdown";

interface MainProps {
  posts: ReadonlyArray<any>;
  title: string;
}

export default function Main(props: MainProps) {
  const { posts, title } = props;

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        "& .markdown": {
          py: 3,
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {posts.map((post) => (
        <div key={post._id} className="markdown">
          <Typography gutterBottom variant="h4" component="h1">
            {post.title}
          </Typography>
          <Typography gutterBottom variant="caption" paragraph>
            {post.created}
          </Typography>
          <Markdown>{post.body}</Markdown>
        </div>
      ))}
    </Grid>
  );
}
